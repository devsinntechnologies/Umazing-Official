// @ts-nocheck
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';
import ReviewsCard from './ReviewsCard';
import { useAddReviewMutation } from '@/hooks/UseReview';
import AuthDialog from '../layout/auth/AuthDialog';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Image from "next/image"
import {useTranslations} from "next-intl"



const TabComponent = ({ product, review, refetch }) => {
  const t = useTranslations();
  const isLoggedIn = useSelector((state:RootState) => state.authSlice.isLoggedIn);
  const [activeTab, setActiveTab] = useState('description');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();
  const [addReview, { isLoading, data:response }] = useAddReviewMutation()
  // Calculate average rating with better null checks
  const avgRating = review?.data?.length > 0
    ? (review.data.reduce((acc, curr) => {

      const stars = parseFloat(curr.star) || 0;
      return acc + stars;
    }, 0) / review.data.length).toFixed(1)
    : '0.0';

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (selectedImages.length + files.length > 3) {
      toast({
        variant: "destructive",
        title: "Image limit exceeded",
        description: "You can only upload up to 3 images",
      });
      return;
    }

    setSelectedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitReview = async () => {
    // Validation
    if (rating === 0) {
      toast({
        variant: "destructive",
        title: "Rating required",
        description: "Please select a rating",
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        variant: "destructive",
        title: "Comment required",
        description: "Please write a review comment",
      });
      return;
    }
    const reviewForm = new FormData()
    reviewForm.append("star", rating)
    reviewForm.append("comment", comment)
    reviewForm.append("ProductId", product?.id)

    for (let i = 0; i < selectedImages.length; i++) {
      reviewForm.append("images", selectedImages[i])

    }


    try {
      toast({
        title: "Adding Review...",
        description: "Please wait while we add your review"
      });

      const result = await addReview(reviewForm).unwrap();
      
      // Handle success
      toast({
        title: "Review Added Successfully",
      });
      
      // Refetch and reset form
      await refetch();
      setRating(0);
      setComment('');
      setSelectedImages([]);
      setIsDialogOpen(false);
      
    } catch (error: any) {
      toast({
        title: "Error Adding Review",
        description: error?.data?.message || "Something went wrong",
        variant: "destructive"
      });
    }
  };

  const handleAddReviewClick = () => {
    if (!isLoggedIn) {
      toast({
        title: "Not Logged In",
        description: "Please log in to add a review",
        variant: "destructive",
      });
      return;
    }
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full ">
      {/* Tab navigation */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 sm:text-lg text-sm font-medium ${activeTab === 'description' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
            }`}
          onClick={() => setActiveTab('description')}
        >
          {t("descriptions")}
        </button>
        <button
          className={`ml-4 px-4 py-2 sm:text-lg text-sm font-medium  ${activeTab === 'feedback' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
            }`}
          onClick={() => setActiveTab('feedback')}
        >
          {t("customerReviews")}
        
        </button>
      </div>

      {/* Tab content */}
      <div className="mt-4">
        {activeTab === 'description' && (
          <div className="description-content sm:text-md text-sm">
            {product?.longDescription}
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="w-full sm:text-md text-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4">
              <div>
                <h1 className='text-xl font-semibold'>{avgRating} Ratings</h1>
                <h3>{review?.data?.length || 0} Reviews</h3>
              </div>

              {isLoggedIn ? (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto" onClick={handleAddReviewClick}>
                      
          {t("addReview")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Your Review</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`cursor-pointer ${star <= (hoveredRating || rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                              }`}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => setRating(star)}
                          />
                        ))}
                      </div>

                      {/* Comment */}
                      <div className="grid gap-2">
                        <Label htmlFor="comment">Your Review</Label>
                        <Textarea
                          id="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Write your review here..."
                        />
                      </div>

                      {/* Image Upload */}
                      <div className="grid gap-2">
                        <Label>Images (Max 3)</Label>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <Label
                          htmlFor="image-upload"
                          className="cursor-pointer bg-gray-100 p-2 rounded text-center"
                        >
                          Click to upload images
                        </Label>

                        {/* Image Preview */}
                        <div className="flex gap-2 flex-wrap">
                          {selectedImages.map((image, index) => (
                            <div key={index} className="relative">
                              <Image
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index}`}
                                className="w-20 h-20 object-cover rounded"
                                width={40}
                                height={40}
                              />
                              <button
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button onClick={handleSubmitReview}>Submit Review</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <AuthDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} useTrigger={false} />
              )}
            </div>
            <ReviewsCard review={review} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TabComponent;

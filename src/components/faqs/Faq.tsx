import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqDataItem {
  points: string | string[];
  subPoints?: React.ReactNode[];
}

interface FaqProps {
  data: {
    trigger: string;
    faqData: FaqDataItem[];
  };
}

const Faq: React.FC<FaqProps> = ({ data }) => {
  return (
    <Accordion className="bg-white w-full py-2 sm:text-lg text-xs sm:px-10" collapsible type="single">
      <AccordionItem value="item1">
        <AccordionTrigger>
          {data.trigger}
        </AccordionTrigger>
        <AccordionContent>
          <div>
            {data.faqData.map((faq, index) => (
              <div key={index} className="sm:text-lg text-xs">
                {Array.isArray(faq.points) ? faq.points.map((point, i) => (
                  <p key={i}>{point}</p>
                )) : (
                  <p>{faq.points}</p>
                )}
                {faq.subPoints && faq.subPoints.map((subPoint, j) => (
                  <div key={j}>{subPoint}</div>
                ))}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Faq;

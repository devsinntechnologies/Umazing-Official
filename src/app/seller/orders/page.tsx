// @ts-nocheck
"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CURRENCY } from "@/lib/constants";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ShoppingCart, FileText, CheckCircle, XCircle } from "lucide-react";

// Dummy data for orders with random product names and descriptions
const dummyOrders = [
  {
    id: "1",
    price: 3000,
    quantity: 2,
    status: "pending",
    createdAt: "2024-11-17T13:31:12.000Z",
    Product: {
      name: "Stylish Comfort Running T-shirt",
      description: "A comfortable and stylish running T-shirt.",
      image: "data:image/jpeg;base64,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", // We'll fetch the image here
    },
    PaymentMethod: "Credit Card",
  },
  {
    id: "2",
    price: 5000,
    quantity: 1,
    status: "shipped",
    createdAt: "2024-11-18T14:15:12.000Z",
    Product: {
      name: "Smart Watch",
      description: "A smartwatch with fitness tracking.",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEBMVFhUXFhUYFRgXFRcXFRUVFRcXGBYWFRcYHSggGBolHhUVIjEjJSkrLi4uGB8zODUsOCgtLisBCgoKDg0OGhAQGjAmICUtLSstLS0tLS0tLS0rKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAECBAYDBwj/xABFEAACAQIFAgQCCAQDBgQHAAABAgMAEQQFEiExBkETIlFhMnEHFCNCUoGRoWKxwdEzcvAVQ4KSouEWVJPxJDQ1c7PC0v/EABoBAAMBAQEBAAAAAAAAAAAAAAABAwIEBQb/xAAkEQADAAIDAAICAgMAAAAAAAAAAQIDERIhMQRBE1EicSMykf/aAAwDAQACEQMRAD8A8l0Cl4Poa6aQaRj9K4+R3aORUipK4qdjXOSdRzR6Hh02qrPiB23qtLNeuV6rOP8AZOsn6Js16jTXq/l2UySniy+v9qo2pXZNJvwpIhY2UXNaLKemyfNL+lHMqyVIxxv60YWOuW8zfUl5xJdsqYXBqgsBVtVqQWpBagVI2p6uYTLZZD5FJo/gujXO8jBRSAyorrFAzfCpP5VuY8nwcPxsCaaTqLCRbRoD+VAGWgyKduEP51fh6QnPNhV2brU/cQCqMvVs54IFAFxeiX7uK5zdJ6fv0NfqDEH75qu+azHlzQB3xfT62IJuK4ZPgDDIAWuh7+nzrkcY55Y1Ezse9AzassNtmFU5IoyfiFYiWeSI3W5XuO4+VXsJmwYUAahxEPvVFXi/FQqLFKeasKFNABFmhI+Kh2JwyHhhSMHpXNkIoEV/qQ9RSrpalQB5BY03jAc1GfFKvG5ofJKWNzXXMOvSNWl4WZ8b2X9aplr0qarzKXhGqb9FXSGBnNkFzRDK8jklNyLL+5rZ5blKRABRUrzKekbjG36A8o6a4aXc+natTh8KFFgKsJHXZY65ap09s6FKXhxVK6Kl6LZbkkkp2G3rWpwmTQYcapLFqyMy2W9Pyy8Cw9TWkw2QYeAapWBNPjc7a2mIaRWexmM7s1zSAP4rqOOMWhQfOs7j8/nf71h7UOmxN6rsb0APJKzckmoVK1dIsO7/AAKzfIE/yoA41IVYky+Vd2jYflVcCgCVKlTigBqcGntTEUDGNDcThCp1xfmvY/L3onTEUAVsBjg3z9KJxSehoLjcFc649m/Y/Op4DMN9LbMOQaANJFij3qyJQaFRveuytQIvaRSqr4hpUAeF01OB2FG8q6deSxk8q+nc16NUpXZxqXXgJwuFeQ2QX/kK1mT9NhbNJ5j+wo3gMtSMWUAUQSOuW8zrpeHRGNI4wwAcCrKrU1SiWW5a0hsBUShVw2FLGwF61mU9OhRrl49KI4LL48Ot23ah2bZwO5/KkARxOPVBpiFh61n8dmCjdjc0Hxeas3GwoeTfmgC5iMxZuNhVJiaQpjQA1XMryyXENpiW/qeFX3Y9qqYXHYJWvisVHEi/EAS8h9lRAT+ZFaEfSxk+GTRAszgcBIrXPqS7D9apOKn9GKySjQ5Z0dFGAZPtG9xZB8l7/nRxcCALAAD0AsPyFeO5v9OczXGEwscfo0rGQ2/yrpAP61is2+kLM8T/AImLkVfwxHwl+X2diR871VfHf2Rec+kp8uB5FZrOOmVbzIdLfsfnXjGSZ/PhlLR6WdwGCjXI2/8AvJDq2PtcHfcAWrVQ/SLmMQ+1wySLbgs5kv66hf22tRXx2vBznX2EMRhmjbS4sf2PyqAoWevhM2nFYYw/xqSdJ7alYA6fcGoQ9QQlxG2pCfhLABW9LMCRv729Kk8Vr6KrLL+wxTU16eplBU1SqSx0AcrVUxuA17jZhwf70WSCrKYS9AGawWPZG0SbH9j8qPQSBhtXLMclDjcb9j3HyoFDiJMO+iT8m7GgDUU1D/8Aaq+1KgDMZR0+ke5F29T/AEo/HEBU1SugWtNtvbEkl4RVa6ItOq0VyfLGlYADakBLKcraUgAbVso448Mtl+KkAmHTSvxVl84zU7gG5pAdM4zncgG5rNTTFjcmou9zc01AhqZmAFybAck8CuWMxSRIXkNlH7+gHqaqdMZDLmz+LiNUeBVrKimzzsPug+g7twOBc3Iriw1kfRPLmnGtsfBYmfGOYsuhMxHxyt5YI/dmNr/17XrS4L6NBJY5hi5Jj3ig+zhH8JYi7j3sDW0weEjgjWGJFjjUHSiCyg97jkt6k7118b022/l/7V6mL4syeRm+ddedAvBdE4CAWjwMA73kXxm7d5dVuR6UahgC/Asa7fdjUD9qsmAlNTkKQABfbne7+59BvVOa6MVbkc1eZT8IVVets7nCl9jHE49GRe5t3BoFmvSOXTA/WMDGt+XjXQfnqjt+9aSGIgG5AYgX4si83Y9iewG9cEn/ALUuKf0a5Oddnl2b/RAu8uV4l0POhyf+l1sR35vf1oPiOnZnKpjnmbQp+zBjjGo3sfKoDG99yfzsK9neJSbqdDWuCL+Y+lhyT+tZnOM2jllOGlTRiALox8oa3NieewtyDa9u8smNLtM6MWSn00ePDCDDuDioI9bq+hHxBvcHkkAqNrjzHVuCttqA5jLrNowPQKDfnjy6QA3Authzaw2HtOIw6TErMgEiXBOkEhWuCUJ4BH5g/kTiZct+qymKVbq48r2ALKvBUgbOoO47DexW6iCZ0tGZfMp8OI28Rma24YsVdfTkg23F9iP2G4yXMUxMYkT5MO6t6H+9ZDqLIyvmjN9Xm2+GQdmAv8e423vcbm4Z+OH1w6Z8Gx08MpFySN2SQd2G+3cbr3CzyYla69KY8jl9+HpUcNWosPXPpvFLioUmTvsw/Cw+JT/ri1aCDB1wtaemdaafZRgwtEsPg6vQYSr0WHoGDjl4I4oFnWQLIpBFbhIK44nC3pC2eR/+EG/G37Uq9O+oj0p6B7POVFTAqK12jW9MDvgcKZGCjvW7w0K4aOw+I1S6dy8RJ4r822psVir6pG4HFIAbneYFRzdjWWZyTc13xmILsWNV6BDUzMACSbAC5PoByaes51zjTHAsY2MpI/4Ftq/cgfrWonk9GaritlbLMNJm2NEYLLh492I2snr/AJm4HoPlv7rgCuHCCNAqoAEUAaQoFrD0+dZH6NMi+q4JGt9pKBNISDsGH2aHbay2O/dmrQtJzYV7+DClOj5/5Wd1f9BjHYlZSGC6dt/VjVE4lQbBfbfY/wBaWLU3CqbaeDcD4dgd/lf86YxJfXLMvbZVLcD8qrMpIjTbYQjnKrsABe63F7NxexPNh/2NUWDlmBDFrnVsSb/lVHF4/sp2B77ft2qv13n6YXwpSCTIh0kcFoyA2/YgFKGlHv2aW8nn0FpMQVXSxKgG9jtv6mhzZzqDeDZrbXN9Or0uB8vbcetYVeqRjx4GIbwnJ+ykBsh2ACS7E+99uOQeSEWb/UI0hdD43muwU6SuprAM4Ui+o7gHuCDxXPef6lHXj+P90zaZb1fCsMgkjMeJUWKG5Dnsyt6bg29+/NZfHMuLjCTsAV1Mjqo8RZCb6ge5ud77WuN72OYfMTI2o9hYDmw3IF+/J/Wi2W+Kw1xq5AZV1KDs7GyrcfeJtb5iuf8As6fCcGLkcGOQWxWHNiOPFUDgX3sy7i/81NS6gy1MXAro7jTokulg7ILN5b8OASQeb3Hc1x6iwskDw4kr4ZDiF9TAkgnYsBvYPdePvtRnKSAraPhLFk/ySgSfkNTOLegFYrrs2uzyn63KYjHocBAXPnDHQW1I/gtaQX1XuTaz3tZrHjgMLNETLJr0OlyrAAuL7ki+xW+sd+OL3ot1Vkb/APxMoYyNhpUTQw+DDSqJIyLG7WMhU37EduFhy+NiBWGdnUaSAX8MWGkGKRyVSwJ8h4ueb0xA3IOq3wWILxnXExHiJYqH/iA+6/v3r3TpzN8NjE14aQNsNS8OhPZ15H8vSvE8L0vIjuHjYOULx7qV0ghXBbcI13TSxNgdja+oVMoxOIwc6zRbSByQD5da7FkYW2vwRb9wKlkxK+16Ux5HPR9KxxVYSOhnTWf4fGx+Jh2vawdDs8bHsw/keD2o2q1x8XvTOl1vwZFp2jvXQCnrfExsq/V6VW7UqOCDmzxQUe6Yy7xXufhFBYkLEAd63uFjGGw/8RFSLj5piLnw04G1AOpMRpURj86IZeb3c+5rJ5pidcjN77UhFWlSG/FbDp3pbiTED5IeB7v/AGoAHdP9PeIPGnOiFQWJOxZVFyfZbd68k6mxhzDGGRRpjJEcCAfDEDZB7E3LH3Y1639NGffV8GMJGbSYk6TbkRC2r9TYfrWB6fyMhI5yPIirITz5UGq9/wAq7fjxpbOXNe3o9eXF+HdV0kBhYFbiy7DvxtxVuLNI0QsgGs2JUBh5rm9zxo32FCcQx8wu2zH/ACjc/vVWU6QdRCm3lDnTrbsilttR7CvdcRrbPnpu96kNYPFK1r21Dt+KwsCPXtcc7d7mg3U2bJFcAXbsgIv29SLVh84zTESs0YljgVSwk+KSRAou19I0Cw3N3Fri/IvQjxsUUKyKcbNGWZS5nkRbqQLhUdfISbXta+171zXnUv8AgdmP4zpf5C5nnUUugritKIGvGqH7RwO24+Hc8c7XIAsdTi8vbMcn0rG3ixxw4iDYnUTGC8atsGY6pxb10m3FYpMqhkUyYeMJJclZZVllU27kOxAsdtVmI/D3rjD1biF8TDYxWaUBlSw3Mp/wxpTa1yN0tqBG/BPJdVT22dkRMrSRUj6cxmhnMD+UhdNrykm2yxC7nm97W2O9HsDi5GjWDG4KQRqoVJVgmE0ekCxu4a42AsLWHAIAWhsPUOJTYEvIPi8KR9MdjZlYiQkMBqsdhfjUN66S9TZjGw1SubrdRrcg3fYsLhuAwsCDfe/atRju/wDVbG6S9ZDEQGNrA61IBDBXXY32YOoKtt3FaHEZlNiEBghZMLC2lEjDMiPYMWkcDzSEMDqPr7m9HFZpjJEMsOJmPJaPUWIUEi6MFHFrlDcgXN2ANj+QHMjhpVE2Khks8h8XCyqrIijyfWHOlL7kDSDcnfi2BgDH4gPhpb6dWljc6i5K+Ye2xF+x2rRdIS64Qf4VH/K0n9CKx+Onk8GVpSdRDA60JcnTb/EZbj5ahWk6A2iAJ20qb+7M5t+mn9RSrwc+mV+knCNJjo442IaURhhvY38qsfW2k/kBW6iaPB4aOJLAKulfcgXZ2t+bH+pIByPVzg5tBIDsikOeFVY18RmJ9AJD+lB+rs+aQ91LKBbukV7qh9GbZ2/4B92s+jHzzPWm1FJ/DKhlWzFWcSWVkJHZtie2woHh8unXZo2kTUreQhiLMLle9yLj8xT5PlHjMGk2Qdu7f2Feu9IZJhMYCreLHKgudDDQw/EAVOk+36e0ry8ekVnHyW2eYZb1ZJhMZ42GUxhSV0N95L7pIoHHt90navp7AT+JFHJpK60VtJ5XUoNj8r1jM1+jPBTr5tfiixSUkFhbgMLAOvsfyIo5kmKnhCw43Tq4WVfge3H+Vrdj+V7Vi8irTNTDWw/UrUhUqEhDWpU9KnoDy7pXBeJLcjYUY6mxd2CDgV26Vg8OEyHvWZzPGXZmPrXIdRYxGO8OEgHdqAQxM7BUBLE7AVLzysAoJJ4AredOZOkKgmxc8t/QegoBkOnOmhFZ5LNJz7L8vf3rVIgUEkgAC5PoByahCtZv6S8yaLCeDFcy4g+GgHNvvEfsP+KrY42yN0eH9f50cZiZsST5L+HCP4V2H7Esfdq9m6Cy2PEZYiyLYtHJDKv4SNcTC3y/nXkU2RsMSkCoZCnkRVGxkudbkk2ALB2BP+7RTbzAj0/pSeWDMJcvxTrpljjlg0jSraF0vGo5ICqBvz4ZPsO7xaOTZnMy6w8MtFLDqlUKzC5COVOmZS+tRGNSEat9n2B2rBYrreTUz4aCKF2ZyZLGWYBmJCq8l9KgEDYdq3H0tYDCzYpo8O6PPGFeSIX+IWVkLD8ShbgEEMPV9vJ8ZFc6l0k21OqKwWIbAA3HuL+/e9Uq6r1k5xzPiNzmsAdlhxEsouvmkU3LSqq7yE3JTWZDb+JeANqXSORySzth3mZMKA8kh4DJFuHKm+kcMb8D5VoMlgkkw+HknhddUYK3BHiiNQiyJzqUqqXNiVI1EaX1DlmOLRFn8OOXw5wkQKLqIjuzTAFdrEiNDuTZ2txasGylgs7Z4mXDq7qukmwuVJNxpHN7i+2+xPF664mJXljxCizjDTaQ19rGNUY6QD5RiHAsL/ZC3FBf9jDDzysJXSAC1/gZ1Yg+G29wu1tRAJ07C9U5Op2+trOAWRAU0Eka4n1eICfultbEHfT5edNAF7BwYiGYyRIA1itpAXAH4Tq3NrLz6C9H8TiPBweGeR1+sTMzKGAt4S6RcE8ea497m3At3XHI+HdsMvigjZgPNGfhCyILmNhckkkKbbFgN8xjsTPNifFwoJMCKsIW0hEcJEYCgA3JLM/5sQdhVcWV46TX/DNTyWgjlGIK4pEW7B5Ii9xc+eRUYkXAAYNpb0ueeTxx3VWJxXgF2JkjAAdNQeY3UxtIoOkupGxABN977VZ6V6bxGNnlSF0M4V/EkZwVQNqUMtl1h2BK2F7XLGxAFA8ZgGwrvHi0AZCUaPXpcXG0iGxDJzvZhzcDalmtXkdJehK0tBfNM1nxWjDPLI2uTVJ4iKrIwuZGJBJYAFvit8thYUeqcRDi38H4C4URuLbKAi37qbKL/wAq1f0fZMrza8UQXZVOhjdhEfgVhe4L2vY/dXT97a79J8SO6xRIvjlftJbXaKD0uOSf1tcD4qlvb0b0YGDNHmZ5JLO25a9grnUWUNc7JcJq48sar3rsmTOzmTEblvMASDqDbh2sTzyB6b967Zj0biGgTFrEY8PpABYEkLqtrYgaRcnuR29auZZIzIZH5kOrfsoAVB/yqtSzVxnophnlXZagjCitJ0LjHTGxBN9ZKMPVSLn9CAfyrNs1emfRzkSxRnGTWBYHw7/dTu3zP8vnXEl2dlPSN5aoTIpBDAEHkHigeadSql1QEn9/07fn+lZyfGYiUgso/wCLzW/I+X9q26RNS36bKHHxI2jxkIPALDUPb3H7/OiwNeeRPiB+Bh3BRQLfkBR3CZ6sRQSXVWJXffS3I39Dv+lE5NdMKg01KuH1xPxD9aaq80T4szOZSeDhPyFeczzljW664k0wqvyrG5XHdtR4HHzrlOk0XT2AEY1H4jz7D0FavCcUAwDUdw7bUCCkFedfSc7JiopmZhHHFcaBdw32nw/hJbT5uBa52Fxv4ZK86+nWZkwkTIPM8nhk+i28S3zJT9NVdGF/y0c+VdAfJ868GGTGMhaTSNMa3IjU2VIwR8K303b2A7KKEY3FSSok2IxTnMXKNh44wwMcVydGqMfZuQSwF7gAb3NZiDF4rEYUwYWKV7NrnMaMRYXCA6eF5NvX5Ci+XYyVcKMYjpFNePDI9wJSilizJt8dmCknfSoAO9q6znMtj4pcPN4qsTdiVe+okkXIe/Nw29/iDXtY1o8BPHiGGIgRTIpV58K7HRNov5ufMBc7njfV+J7meZQGDNAzTPGCMXE66WbljLEo5UaiQRuBvupNYrEYNoyJIWJUeZWW4ZbcG4/mP2Ow0I2f0g9bYrMWjiX7JEZnWBbh0MYNpJX28wGogDYDfvWVHU2Kt5pA57s8UUjn5u6lj+Zq1B1Gko0Y2PXtbxY/LKAedQ2D/wDST3Jq1/s/Dy7wYqFtMZREn+w8MNq8xLAKzAsx8pbzEG9AzVeNh4cJLJN4WJjZI2SSSRCZi1teGjiHmgKkMdSgW0gm9qodSrlxwCNhzhhJ4UPkVkMwbQuoNZAxcNyb72PtU+pslxEsOHjGGmEMKTeCQY9ADoNARtV3BkXUxO++1ZSLpyQFNcU1tL+JZRs930BfUbR3+ZoA1eR4XDDL/reFhX6ykb6hIWllZ00BnhRJF0p57lit19DzWJOYYrEfZGaeW9/IZHe9gT8JO5sDRvp7Xg3RyuhmSVJQcSkWtXtp2EgawIFxY3A4vwZh6ZfFuHDJEisXjSEFLNpQEK7KpUkoG+CwLG3NGw0ZPI8W+Hkjlhd/EZXEfgt9qkgPlDJbzA2W44Ksd7jbR5linM64jNZA+IkICIRqihGw1y22IW4OgX7X9BX6ezSJA5hg8PwnUzC5aWSBvI51ndSrFDZbdveu2cyo6fV9LTspJSyOrFbnSz3sRte5sAbE33FJjWghicSFbxUuJr6HVAGErKNmDG4N99wdwDfZQx49QY0JhvDNzI/mnLG5Mg2CXP3Y9xbu5JPmUg5/K2mL6MO6rJpGks2kEcMYfup8I3O/DDTba8uHkdlE2ryC0gZQtpEZh4YA2sAF47Gs0+K2wlcnpF/AY7GfVPqsmJkMLx6GiY3CpcFQrHdbADYbduKmq8ADYbCnCk0dyLIGkOp9kHJP+t64bt16d0wp8KmS5WZZFut1Bu3a4HO/Ye9b3EYqSWyg2Ata2yrbgIP6nf5Vzw2FUDTGNK/u1vX+1EI4wNhWDRVwuBC1cWMCnvXOSYCgCwqigPWzgJEB3c/sv/f96643NQo5rLYvMDiJFY3MacC9tVzdrHtwN/akBLxm/E36mno1/tPA/wDkj/6z0qYtlv6RHsqft8zWawbBbAVq+usE0nh6d7VmWy6RDZhSGH8sko7h3rK5fqFaLAvxegAo0mlb2ueFF7XPYX/I/oa88+kVZ8dhkkw0xjETomJwsmlSsjkKpf8AELsLbkEEMvG7dUdSNNjHwmFnMUkGgxnhZJSCXR9t1N0HsVPY2rBdU9VYjH4mKOONY5Yz4Y8M6jNLq7sNit/hG4Fyb7124celtnHlvb0XX6ofAg4PDwiN0JEcu4lRiAZHdbEOH2Ok3AGnmwtmcJkuOxUQMUbyLErNYFdWlmOoqhOqQagwJAO4I7WrV5x0piZp0xOKnj1mQRvArMJoxGlwi6hpsQqgNexLg73ozlHUiMwgxQGFaI2glQBfq2nbSQeY7WDBvz2IarkjIZBnCzaY5XMcqW8CcHzRkcK55Md/mVv3F79sdgjLI7SnD4SaMurEuFjxEybkxoLrG2nkg6bsALXsD/X3T8UyyYk+HhsZEviSqDaHFJcDxoD3Yki45BIB5DMDxD4QzYSBidax2mka7xs7amUlb7rqI1W+IH23AM9jcubZponTUurWFspXs+k2BB5uLA7WvVGLBeYWkS3NzcCw3329u1612E6jeORGzDXjEieTQjSDSBqs0ykrdrW8o24J8oIFXM0fLZJfEgvDEF1StIPMS48sSoAWcna++wN/SgD2DpbrPKkw0UKY2G0USIbkp8CgEkMBYbGu2ZdU5e6M0WJgkNreV1b+VeJ9P9G4mQiY4eHDqDdBJ43iEdisZkJAI7t+9LE9J4mMkBcKSbkDwV2A2vduFHqdh3NMCPWWE+tYiIxPGo85d2dI0RQV5LlRe5O1+4o1k2ZsLRYaOSUrcNJpUKNNwHUFtLrcX+MbEGgEGR4ZHj+sOJ5JLCKKFRDCSSAAZVF5PjB8gtsbvVPP+o5Fc4fDeGI1NtMcf2ZbUQRocee+27Am/c0gCq4I+IWtFqLEyNEWlZ21XceKdCQ7s2y+cC+2wqvmuFZIWWIBNbDXZmOtd2KySt55N+3lW3a+9dYGxJKyBLK6AMpAGmVbXdkHwAi4FtjYd9gSw0Ln/EbVfsBZR/ep3kU+m4h0UMjwKzIVubJYo4Qa43uQ41cG4Bva+5UkcGieLiUaIUudIAG5JCgbKSf19r+9Wo8MTewsTyRsT8yOaN5JkSxnxJf+FfW/c1DJm5LSLxi4vbIZPka2Dy7KP1Y+1aJYdVuyjhbbV0WK5u36dh7VYtaucuRRbUne1cZpwKDZhmoXvQII4rGgd6zmbZ+E7/IDk/IUFzDO2clYtz3PZfn/AGqrh8HvqY6m9T/T0oGSkeSc3kNl7L6/5j/Sr8KWFhTIldKTAe9Ko0qAPVcbKiIZpOFW+9YHFZkZozP2LG3yrW40riMKYyLgrY15RnuOkwcKwaSYwTZ/z4PvTS2M0ODxporh5pCRo5JAHuSbAfuKxGRZsrEXNFcZ1LF9YGFZVYaVJDErqYknSjj/AA5BZGVxwfTkaiHVaMXXFbMdmuVkZjJ9qYHEzh2dTdS+o6wByCCbEdvSiWGyLDR4qSNMQyzCHWzSKmiJydbFSuzIUHxACyyetwGz7qoyYqSORfrEYh8MF0EckhjDOGmIt51YlSwtulxzvmsjwiTFXxJlRLmNpEF7kqdIb1sORyV4r0V4cAs06gxGLmV3l88Y0wkbCwubEne59W+R240mXYpMxAil+zxibK3w67bBW737X7XtuDRXNPozhmgMmWswxCKGMLOHSRfxQyWFwexPpYhTcDJ9PYNZZlGJZ8M8baWlA8wYA6QwPcEC/oB8hQBTxWMxOJK4LW7hHtFF5bCS+nSljYcna9ubUczfoiHDRL42JKTFkCWAeGdWZVJhkHwlLnVq9LjkUVxOW5emIkgw1sPPHh5NcnimWLVbUzI1yVUoCCRZgJCLbXPnJbxCbnfcrf7xJJNz670AeldW9JQtJhXwXxSlY2isXB0KqrLYcWJVTcgXZdxcmvSelOgcDlqCea0k4GozTAeRjuSi7hNzzufevCMq6lmhdGZnDIqqro1nRQSTYG6v/ErDzaRwRevQs0zafFhDNIHACkWUrGTyHEdzvwbm9tiLUvA1sM591TGWP1cXB31n73uvO1uNrHcEoazEuLaT4t7kH21C1mtvdthZm1MPxVVeQE+v9fzrpGx4sB8v6nvUrzKS0YmyL4X7VJS5WRCSGU6muSL3vcduea7EksWAsTe54JvzuLn9fWpRR1YjjqH56Lfhk4IpP9hxRLB4O5F9z2HepYLBNIbKK02CwaxbLu/dvT5VKqb7ZRJLw54TACP4gC3Ydh86vRR73PP8qnHHb596UsoFIZJmtVTE4sAc1Tx+ZAd6yOb56SdKbt6D+p7CgAlm+dhQd7CszJLJOd7qn/Uf7ClDhGY65Dc9h2Hy/vRGOO1AHHDYUKLAVaVakBT0AK1MTSJqJNACpU16akBvslm8pWhec5SkmpHUMrcg1awKlTei0sOregDwfqPIpsvk1LdoWPlb0/hf0Pv3oTMFlVpWO4ux7G/YfmbCvofF5RHNG0cihlYEEHg/27V4dg5tKiDT4U8RKlXHmUg3a9x51LAEg7g3sSCAvZhrl39nLlWujj0/EhfRjI/OBqRJdUYlQg6lLbFTaxVvUD0vVrC9QLh55Y5ogcLKbadCp5VAVXKxgAPZVYlbWbcVVzxBLG0ltTqdFgS2gqPMN99CqrWvwAtMkDAfVscmk+URvcEbi6edSQQR8LDY2I7VcibDBY5sCVkSRpMGWuki2LwFtyD2sR2+Fx6bFQud9YxznG+PCutyvg2Vks6KESS43vYFrNzcDcUHhgxkay4OPxHWQKAEBPMi6QfwhiCLX59d7lciWXDRR4qREdUJjl8oE2H0yaVJYg6CGGxItyrC3IID9JRQhlkxqP4JZlV1FypA8xItaRBrUlN7787q2t+keDLBh0CxJHizpaL6qoEM8bcSWXyhD6fECNrjcjMH1Tc4iHModWppJbAadL7kaSvw82DDYj1vuJ6MyozymZh5UPlH4pDwPy5+dqVVxW2OZ29IP5dloEEaTKHZR94Albm9gfbj8qJu5O23Hp2Hb5bCt3jehEO8chU24I1DVb17AmsbjculhYrKpU9vQ+6ng1wuqO1KSmY67RRCkg71bgwrn4UY/JT/AErJsgkf+v8AXyongMA0hsOO57Aet675ZlBbzS3VR+pPpatBDCLAAaV9O59zSA5YaEKNEY27t3arSoFGwpO4FUMZjwtAFnEYkLWdzXOQt96F5zn4GwNyeAOTQHwXlOqXjsvb8/U0AdMTj5Jz5CQv4v8A+R/WuuFwYXgb9z3J9zXeKMCuqigBlSugp6YmkAr0xNMTUb0wHLVcyjLHxEgRBt949gKIZJ0tNPuw0J6kbn5CvRcoymPDoFQfM9z7mmlszVJGd/8AA8fqaVbKmrfBE/yMykGHojDHtUooasJHUiuyCRVmetehkxwEsREWKj/w5LeV7f7uUDlT68j3Gx1yrXUCtztPaMV36fNOTZXJhp5IZ9cWJUg7ke9nQ8ODexuCLdzqIBiylDFIg8MBi0YUt4QvdpYBy8F7F4b6kNmU8GvX+r+kocfGAxMcyXMMyjzxn0/iQ91/kd68ozJGwxaHHqY5olMiMp8koQG0kD7H1FuRex5IrsjJyOao0B8PmaYV2im1qUI8KZRrDxMVDwyhgBJGPMQSAdrgA7Ea3TmKZ3w8D60ZkkJMgVLPqEbNc9yCNXF9N+RRLNAuYLCYSVUajKNOqQEaQQi3AkKrdrAgkb9rU8GK+pt9Xn1KEDHDzqmoi6/aRyLw8Td0PYjgb1QmBsZg8UHXAYiPRMCFDPz4XITUPiS4BFvS1eo9C5KokiiQeSLzsfUg3ufctb96y/Rr4nNMU00nmXDRWiS5IjDmwVC2521cknj0Fex9P5WMPHbYuxu5/kB7CuX5Fd8TpwrS2Fia5zYZZBZ1DD0Iv/OpqK6rtUTbZUgyuFN1jRfcKKoZhmCkWTji45b/AC+g96hmmY6/Ivw3/wCf3P8AD/Oqwsu53Pr/AG9qTf6NJfsZUv5n/IdgKjPiQKq4zHAd6ymc9QBe/wAvUn2pGw1mOahRzWPx2bvKSsX5t2Hy9apsJJjeQkL+Huf839qvwwAcUAV8Lggu53J5J5NXUSphKkBQAwWnpGmJoARNRJpiaiTQA5NajorKElbxH3CnYe/vWTJrffR5gnVWkbhuB8u9CE/DbRoAKlSpquiA9KmpUAUkWuoFRFSWoooSAp701qkBW0IkKE9UdN4fHwGDELccow+ONvxIex9uD3osBUwK0ujLPnzNsvlyeN4MRGHAYyYaYD7OVrrpvv5XWwJX0B55IvqfqOLEYJSgAkdwrqeU0i7W9j5d/QketfRWc5TDioWgxCB42G4P7EHkMOxFfPfXfRuIyvXYeNhZPKkhFyn4RJbhx2YWB/Va6ItP30jU68N39DmXeBh1JHmlVpG/MrpH/KB+pr0dTXk/0R5yGhRGO6ao/wAuV/YgflXqyNtXJe+T2dM64rR3Wg2bY7WTGpOlTZyPvN+Ae3rVnM8UUSy/E2w9vU/kKANIFF/0/v8AM1jY0jtqC88nn+3yoZmGZhRzQ3OM6VASWrJ4jESTne6p6feP9v5/KjRst5nnbSErFue57D5n+lVMNg99THU3cn+Q9KsQYYKLAWqwq0bAZI7V3UVGlegCd6V6hemLUASLVAmmLVAtQBMtUACTYc1EXJsBvXoPSfS4UCWUXY7gH7v/AHoBvQ3SfTIC65lBY8A9hWzggCCygAD0qSIBUqrM6I1Wx6alSrRkVKmpUBoBdNZ7DjYFmhPs6n4o37o3v796LgV4LluNkwGIXEYMh42TU4ufDljvYi55N9Vjtbf0Ne1dPZ1DjIVmgNwdmU/Ejd0cdiKVRpm09hIVICkBUlpCHAqVMKetGRVXzDAxzxvFModHUqyngg1YpUxHz31B09NkWKEqanwkjDS/dTyEkt94evce4IHr2TZissaspBBUEe4Iv/KjuY4COeN4Z0DxuLMp4I/oe9+1edw5ListkEaK82Gv9m6qWZB2SRVG1vUCx9uKzk77+zeProMZvjF12Y2G4HyX4v3sKxmd9Q7lYvM3oOB8/QVf6jyDHSyGYRuIgmlQtjIb2LEpyoOkdr1m1woQ6dOkjkHm/vfe9R1r0qivFh2Ztcp1N29F+Q/rV5EtSUVMUDJAU9XMBlU8xtFGx97WX9TtWtyjoXhsS1/4F4/Nv7UJNibSMRHGzfCCfkL1YGVzkXET/wDKa9dw2XxxqFRAoHYCu/hD0rfBmfyI8PcEGzAgjsaeKJnIVBcnsK9gxOSQSHU8ak+pAvU8PlUSfCij5KAaXFhzR5rhukcS/KhR7mjuXdCKN5mLew2FbkIKetcBOwZgsihjtpjUW723okqgcU9KtJJGG2xUqVNTAempUzNQA9Khn/iHCf8AmIP/AFo/70qNj0fPuRf/ACkf+eT/APJFW9+hD48X8ov5UqVUyGJPVzUqVKpGhxT0qVMQqVKlTExU4pUqGAxrEfSD/wDr/WlSqdm49MCKL9O/4q/P+lKlUix6vhOK7ilSq8+EK9FSpUq0JDUxpUqQD01NSoGPTUqVACpv9fvT0qAGrP8AXX/0/Ff/AGmp6VIZ4DSpUq2M/9k=", // We'll fetch the image here
    },
    PaymentMethod: "PayPal",
  },
];

const OrderCard = ({ order, handleUpdateStatus }) => {
  const getStatusOptions = (currentStatus) => {
    const statusOptions = {
      pending: ["In Processing", "Cancel Order", "Out of Stock"],
      "in processing": ["Shipped", "Cancel"],
      shipped: ["Delivered"],
    };
    return statusOptions[currentStatus] || [];
  };

  return (
    <div className="bg-white border rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 sm:p-6 flex flex-col sm:flex-row gap-6 sm:gap-8 justify-between items-center max-w-full">
    {/* Product Image and Info */}
    <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-1/2">
      <Image 
        width={300} 
        height={300} 
        src={order.Product.image || "/default-product-image.jpg"} 
        alt={order.Product.name} 
        className="size-20 md:size-20 object-cover rounded-lg shadow-md" 
      />
      <div className="flex-1">
        <h4 className="text-base font-semibold text-primary mb-2">{order.Product.name}</h4>
        {/* Quantity and Price */}
        <p className="text-sm font-semibold text-gray-800 mb-2">Quantity: {order.quantity}</p>
        <p className="text-base font-bold text-primary mb-4">Price: {CURRENCY} {order.price}</p>
      </div>
    </div>
  
    {/* Order Details */}
    <div className="flex flex-col sm:flex-row sm:w-1/2 gap-4">
      <div className="flex-1">
        <p className="text-sm text-gray-500 mb-2">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        <p className="text-sm text-gray-500 mb-2">Payment Method: {order.PaymentMethod}</p>
        <p className="text-base font-semibold text-gray-800 mt-2">Current Status: {order.status}</p>
      </div>
  
      {/* Actions Section */}
      <div className="flex flex-col gap-4 justify-between mt-4 sm:mt-0">
        <Button variant="outline" className="text-sm flex items-center gap-2 text-primary hover:bg-primary hover:text-white transition-all rounded-md py-2 px-4">
          <FileText size={16} />
          Print Invoice
        </Button>
  
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-sm flex items-center gap-2 text-primary hover:bg-primary hover:text-white transition-all rounded-md py-2 px-4">
              <ShoppingCart size={16} />
              More Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Shipped")}>
                <CheckCircle size={16} className="mr-2" />
                Shipped
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Cancel")}>
                <XCircle size={16} className="mr-2" />
                Cancel
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>
  
  );
};

const Page = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState(dummyOrders);
  const [selectedTab, setSelectedTab] = useState("All");
  const t = useTranslations();

  useEffect(() => {
    // Fetch random product images from Pexels API
    const fetchRandomImages = async () => {
      try {
        const response = await fetch("https://api.pexels.com/v1/search?query=product&per_page=2", {
          headers: {
            Authorization: "YOUR_PEXELS_API_KEY", // Replace with your Pexels API key
          },
        });
        const data = await response.json();
        const updatedOrders = orders.map((order, index) => ({
          ...order,
          Product: {
            ...order.Product,
            image: data.photos[index]?.src?.medium || "", // Fetching the image URL
          },
        }));
        setOrders(updatedOrders);
      } catch (error) {
        console.error("Error fetching images from Pexels:", error);
      }
    };

    fetchRandomImages();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const updatedOrders = orders.map((order) =>
        order.id === id ? { ...order, status } : order
      );
      setOrders(updatedOrders);
      toast({
        title: "Success",
        description: "Order status updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  const filterOrders = () => {
    if (selectedTab === "All") return orders;
    return orders.filter((order) => order.status.toLowerCase() === selectedTab.toLowerCase());
  };

  return (
    <div className="w-full py-6 min-h-[70vh]">
      <Breadcrumb />
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary cursor-pointer">
        {t("orders")}
      </h3>

      {/* Tab Bar */}
      <div className="tabs mt-6 flex gap-6 border-b-2 pb-2 mb-6">
        {["All", "Unpaid", "To Ship", "Shipping", "Delivered", "Failed Delivery", "Cancellation", "Return Or Refund"].map((tab) => (
          <button
            key={tab}
            className={`tab px-3 py-1 text-base font-semibold rounded-md transition-all duration-300 ease-in-out ${selectedTab === tab ? "text-primary" : "text-gray-600 hover:text-primary"}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Order Cards */}
      <div className="flex flex-col gap-6">
        {filterOrders().map((order) => (
          <OrderCard key={order.id} order={order} handleUpdateStatus={handleUpdateStatus} />
        ))}
      </div>
    </div>
  );
};

export default Page;

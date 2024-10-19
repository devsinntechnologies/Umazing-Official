import React, { useEffect, useState } from "react";
import { House } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const BreadCrum = () => {
  const [pathSegments, setPathSegments] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Ensure the component is mounted on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);
  useEffect(() => {
    if (isClient) {
      const { pathname } = window.location; // Use window.location to avoid using useRouter prematurely
      const segments = pathname.split("/").filter((segment) => segment);
      setPathSegments(segments);
    }
  }, [isClient]);

  if (!isClient) {
    return null; // Render nothing during SSR
  }

  return (
    <div className="w-full  py-2  flex justify-start items-center ">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="text-lg md:text-xl  flex gap-3 items-center"
            >
              <House /> Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const isLast = index === pathSegments.length - 1;

            return (
              <React.Fragment key={index}>
                <BreadcrumbSeparator className="text-lg md:text-xl " />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className=" text-lg md:text-xl">
                      {segment}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrum;

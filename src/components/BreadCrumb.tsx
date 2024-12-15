import React, { useEffect, useState } from "react";
import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const BreadCrumb: React.FC = () => {
  const [pathSegments, setPathSegments] = useState<string[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Ensure the component is mounted on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      const { pathname } = window.location;
      const segments = pathname.split("/").filter((segment) => segment);
      setPathSegments(segments);
    }
  }, [isClient]);

  if (!isClient) {
    return null; // Render nothing during SSR
  }

  return (
    <div className="w-full py-3 flex justify-start items-center">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="text-sm md:text-base flex gap-1 items-center justify-center"
            >
              <Home className="size-4"/> Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const isLast = index === pathSegments.length - 1;

            return (
              <React.Fragment key={index}>
                <BreadcrumbSeparator className="text-sm md:text-base" />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="text-sm md:text-base">
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

export default BreadCrumb;



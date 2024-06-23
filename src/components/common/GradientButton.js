import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const GradientButton = ({
  url,
  title,
  className,
  onClick,
  ...props
}) => {
  return (
    <div>
      {url ? (
        <Link href={url}>
          <Button
            className={`-inset-px opacity-100 transition-all hover:opacity-80 hover:-inset-1 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 ${className}`}
            {...props}
          >
            {title}
          </Button>
        </Link>
      ) : (
        <Button
          type="submit"
          onClick={onClick}
          className={` ${className}`}
          {...props}
        >
          {title}
        </Button>
      )}
    </div>
  );
};

export default GradientButton;

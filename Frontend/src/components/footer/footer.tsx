import React from "react";
import { BadgeQuestionMarkIcon, Package } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="pt-8 border-t border-border pb-5 px-3">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {currentYear} GVCC & NXT WAVE.
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Package className="h-3 w-3" />
            Product List
          </span>
          <span className="flex items-center gap-1">
            <BadgeQuestionMarkIcon className="h-3 w-3" />
            Enquiry Managment
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;

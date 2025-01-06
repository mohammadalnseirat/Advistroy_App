import { Footer, FooterDivider, FooterLink } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaSnapchatGhost,
} from "react-icons/fa";

const FooterComponent = () => {
  return (
    <Footer container className="border-t-8 bg-gray-100 border-[#010852]">
      <div className="w-full  max-w-7xl mx-auto">
        <div className="w-full grid sm:flex justify-center sm:justify-between md:grid-cols-1">
          {/* Logo Start Here */}
          <div className="mt-5">
            <Link to={"/"}>
              <img src="/footer-image.png" alt="logo" className="h-10" />
            </Link>
          </div>
          {/* Logo End Here */}
          <div className="grid grid-cols-2 sm:flex  gap-8 mt-5 sm:mt-0 ">
            <div>
              <Footer.Title
                title="PAGES"
                className="cursor-pointer text-lg font-bold font-mono text-gray-500"
              />
              <Footer.LinkGroup col>
                <FooterLink
                  as={"div"}
                  className="font-medium hover:text-purple-600 transition-all duration-300"
                >
                  <Link to={"/"}>Home</Link>
                </FooterLink>
                <FooterLink
                  as={"div"}
                  className="font-medium hover:text-purple-600 transition-all duration-300"
                >
                  <Link to={"/ads"}>Ads</Link>
                </FooterLink>
                <FooterLink
                  as={"div"}
                  className="font-medium hover:text-purple-600 transition-all duration-300"
                >
                  <Link to={"/contact-us"}>Contact Us</Link>
                </FooterLink>
                <FooterLink
                  href="#"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-purple-600  transition-all duration-300"
                >
                  Pricing
                </FooterLink>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title
                title="ACCOUNT"
                className="cursor-pointer font-bold text-gray-500 text-lg font-mono"
              />
              <Footer.LinkGroup col>
                <FooterLink
                  as={"div"}
                  className="font-medium hover:text-purple-600   transition-all duration-300"
                >
                  <Link to={"/sign-up"}>Sign Up</Link>
                </FooterLink>
                <FooterLink
                  as={"div"}
                  className="font-medium hover:text-purple-600  transition-all duration-300"
                >
                  <Link to={"/sign-in"}>Sign In</Link>
                </FooterLink>
                <FooterLink
                  href="#"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-purple-600 transition-all duration-300"
                >
                  Reset Password
                </FooterLink>
                <FooterLink
                  href="#"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-purple-600 transition-all duration-300"
                >
                  User Account
                </FooterLink>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex justify-center sm:justify-between gap-4">
          <Footer.Copyright
            href="#"
            by="مؤسسة صقر العروبة للدعاية والاعلان"
            year={new Date().getFullYear()}
            className="text-center text-[#010852]"
          />
          <div className="flex items-center justify-center flex-col md:flex-row gap-4 mt-4 sm:mt-0">
            <div className="flex items-center gap-1">
              <img src="gmail.svg" alt="gmail" className="h-6" />
              <a
                href="mailto:saqar@gamil.com"
                rel="noopener noreferrer"
                target="_blank"
                className="text-gray-600 font-semibold ml-1"
              >
                saqar@gamil.com
              </a>
            </div>
            <div className="flex  items-center gap-1">
              <img src="/phone.svg" alt="phone-icon" className="h-6" />
              <a
                href="tel:+966582839963"
                rel="noopener noreferrer"
                className="text-gray-600 font-semibold ml-1"
              >
                +966582839963
              </a>
            </div>
          </div>
          <div className="flex gap-4 mt-4 sm:mt-2 items-center justify-center">
            <Footer.Icon
              href="#"
              target="_blank"
              icon={FaFacebook}
              className="text-[#1877f2]"
            />
            <Footer.Icon
              href="#"
              target="_blank"
              icon={FaInstagram}
              className="text-[#e4405f]"
            />
            <Footer.Icon
              href="#"
              target="_blank"
              icon={FaTwitter}
              className="text-[#1da1f2]"
            />
            <Footer.Icon
              href="#"
              target="_blank"
              icon={FaSnapchatGhost}
              className="text-[#cac608]"
            />
            {/* <Footer.Icon /> */}
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;

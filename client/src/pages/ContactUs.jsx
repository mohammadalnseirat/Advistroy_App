import { Button, Label, Spinner, Textarea, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";

const ContactUs = () => {
  const formRef = useRef();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          toast.success("Your message has send successfully!");
          setIsSending(false);
          formRef.current.reset();
        },
        (error) => {
          toast.error("Failed to send the message. Please try again!");
          console.error("Failed to send email: ", error.text);
          setIsSending(false);
        }
      );
  };

  return (
    <div className="mt-6 sm:mt-10 min-h-screen">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center flex-col gap-2 mb-4">
          <h1 className="text-3xl sm:text-5xl font-mono text-cyan-800 font-bold text-center">
            Contact Us
          </h1>
          <p className="text-sm sm:text-md px-1 sm:px-0 text-gray-500 text-center font-semibold">
            For business inquiries, technical support, or general information,
            contact us.
          </p>
        </div>
        <div className="flex items-center justify-center max-w-xl mx-auto p-3">
          <div className="w-full p-4 border border-gray-400 shadow-md rounded-lg mb-6">
            <form
              ref={formRef}
              onSubmit={handleSubmitEmail}
              className="flex flex-col gap-6 "
            >
              <div>
                <Label
                  value="Email:"
                  className="font-medium text-blue-600 ml-1"
                />
                <TextInput
                  type="email"
                  name="user_email"
                  placeholder="Enter your Email..."
                />
              </div>
              <div>
                <Label
                  value="Message:"
                  className="font-medium text-blue-600 ml-1"
                />
                <Textarea
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your Message..."
                  maxLength={300}
                  className=" h-[250px] sm:h-[300px] resize-none"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mt-3">
                <p className="text-gray-600   font-medium text-sm dark:text-gray-400">
                  <span
                    className={` text-purple-600 rounded-md border w-4  px-2 py-[2px] ${
                      300 - message.length === 0
                        ? "text-red-500 border-red-500"
                        : "border-purple-600"
                    }`}
                  >
                    {300 - message.length}
                  </span>{" "}
                  <span className="ml-1">Characters Remaining.</span>
                </p>
                <Button
                  type="submit"
                  disabled={isSending || message.length === 0}
                  gradientDuoTone="purpleToBlue"
                  className="w-[100px] sm:w-[150px] flex items-center gap-2"
                >
                  {isSending ? (
                    <p className="flex items-center gap-2">
                      sending...
                      <Spinner className="size-4" color="warning" />
                    </p>
                  ) : (
                    <>
                      <span>Send</span>
                      <BsFillSendFill className="size-4 ml-2 mt-[2px]" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

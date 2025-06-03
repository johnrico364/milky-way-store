import { AiFillInstagram, AiFillFacebook } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa6";

export const Screen3 = () => {
  return (
    <div className="screen3-container">
      <div className="flex flex-wrap">
        <div className="basis-full lg:basis-1/2 px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mt-8 mb-6 text-center lg:text-left">
            LOCATION
          </h2>
          <div className="w-full flex justify-center lg:justify-start">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.089291420762!2d123.93633307586565!3d10.334739167183711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9985234ff316f%3A0x4e3c65acc5b4b6f2!2sACLC%20College%20Mandaue!5e0!3m2!1sen!2sph!4v1748969018542!5m2!1sen!2sph"
              className="w-full max-w-[600px] h-[450px] rounded-lg"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="basis-full lg:basis-1/2 px-4 mt-8 lg:mt-0">
          {" "}
          <div className="max-w-[600px] mx-auto space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-medium mb-4">
                Contact Us
              </h3>
              <p className="text-lg mb-2">📍 ACLC College Mandaue</p>
              <p className="text-lg mb-2">📱 Phone: (123) 456-7890</p>
              <p className="text-lg mb-2">✉️ Email: info@milkyway.com</p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-medium mb-6">
                CONNECT WITH US
              </h3>
              <div className="flex flex-wrap gap-8 items-center">
                <a
                  href="https://instagram.com/milkyway"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-lg hover:text-blue-600 transition-colors"
                >
                  <AiFillInstagram className="text-3xl" />
                  <div>
                    <p className="font-medium">Instagram</p>
                    <p className="text-sm text-gray-600">@milkyway</p>
                  </div>
                </a>
                <a
                  href="https://facebook.com/milkyway"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-lg hover:text-blue-600 transition-colors"
                >
                  <AiFillFacebook className="text-3xl" />
                  <div>
                    <p className="font-medium">Facebook</p>
                    <p className="text-sm text-gray-600">@milkyway.dairy</p>
                  </div>
                </a>
                <a
                  href="https://tiktok.com/@milkyway"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-lg hover:text-blue-600 transition-colors"
                >
                  <FaTiktok className="text-3xl" />
                  <div>
                    <p className="font-medium">TikTok</p>
                    <p className="text-sm text-gray-600">@milkyway.fresh</p>
                  </div>
                </a>
              </div>
              <p className="mt-6 text-sm text-gray-600">
                Follow us for the latest updates, promotions, and dairy
                inspiration!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

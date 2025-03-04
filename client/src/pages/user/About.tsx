export const About = () => {
  return (
    <div className="about-container flex">
      <div className="lg:basis-6/12 basis-11/12">
        <div className="text-4xl font-semibold mt-3 letter-1">Our Purpose</div>
        <div className="text-justify word-2 italic px-4">
          <div className="text-2xl text-center font-semibold mt-4 letter-1">
            Vision
          </div>
          "To be the leading third-party logistics company by providing quality
          service, setting the standard for excellence in customer service,
          sustainability and innovation”
          <div className="text-2xl text-center font-semibold mt-4 letter-1">
            Mision
          </div>
          “To store boxed goods safely, securely and delivering orders
          efficiently and timely to its customers with a commitment that every
          interaction will be driven by integrity and respect.”
        </div>

        <div className="text-4xl font-semibold mt-14 letter-1">Our Story</div>
        <div className="text-justify word-2 italic px-4">
          <div className="mt-4">
            <b>Milky Way E-Store</b> is a corporation type of business founded
            by Amen Say and Steven Lava in 2022 with the vision of helping
            clients get their products quickly, efficiently, and safely.
          </div>
          <div className="mt-4">
            Milky Way is a e-store company that stores
            and sales warehouses goods. The company offers storage, delivery, and
            information management services to organizations that distribute
            fast-moving consumer goods. The company can deliver goods to Bohol,
            Central, Northern, and Southern parts of Cebu.
          </div>
        </div>

        <div className="text-4xl mt-12 mb-5">Address</div>

        <iframe
          className="mb-12"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4870.586060838525!2d123.93633307586565!3d10.334739167183711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9985234ff316f%3A0x4e3c65acc5b4b6f2!2sACLC%20College%20Mandaue!5e1!3m2!1sen!2sph!4v1739594459319!5m2!1sen!2sph"
          width="800"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          // referrerpolicy="no-referrer-when-downgrade"
          title="Google Map Embed"
        ></iframe>
      </div>
    </div>
  );
};

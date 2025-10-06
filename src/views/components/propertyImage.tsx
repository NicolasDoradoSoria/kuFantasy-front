type PropertyProps = {
  type: string;
  name: string;
  imageUrl: string;
};

const PropertyImage = ({ imageUrl, type, name }: PropertyProps) => {
  return (
    <section className="md:w-1/2 flex justify-center p-6 relative z-10">
      <img
        src={type === "store" ? imageUrl : "/ciudad-medieval.jpg"}
        alt={`Imagen de ${name}`}
        loading="lazy"
        className="object-cover rounded-2xl border-4 border-yellow-900 shadow-2xl w-full max-w-md h-96"
      />
    </section>
  );
};

export default PropertyImage;

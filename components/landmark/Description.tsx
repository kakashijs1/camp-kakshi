const Description = ({
  description,
  price,
  province,
}: {
  description: string;
  price: number;
  province: string;
}) => {
  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        รายละเอียด
      </h1>
      <p>ราคา : {price}</p>
      <p>สถานที่ : {province}</p>

      <div className="relative group mt-6">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000" />
        <div className="relative bg-white dark:bg-gray-950 px-6 py-8 rounded-lg shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
          <p className="text-base sm:text-lg md:text-2xl lg:text-3xl leading-relaxed text-gray-700 dark:text-gray-200">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default Description;

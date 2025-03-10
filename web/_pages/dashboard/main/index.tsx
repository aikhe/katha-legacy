const MainPage = () => {
  return (
    <>
      <h1>Main Page</h1>
      <a href="/dashboard/main/categories">Categories</a>
      <div className="space-y-2">
        <p className="font-helvetica text-[#121212] tracking-[-2%] text-4xl font-bold">
          Helvetica Neue
        </p>
        <p className="font-helvetica text-[#121212] tracking-[-2%] text-2xl font-bold">
          Topmost Layer
        </p>
        <p className="font-helvetica text-[#121212] tracking-[-2%] text-[16px] font-bold">
          Higher Anarchy
        </p>
        <p className="font-helvetica text-[#121212] tracking-[2%] text-sm font-medium">
          Medium Text
        </p>
        <p className="font-helvetica text-[#121212] tracking-[2%] text-[14px]">
          Body Text
        </p>
        <p className="font-helvetica text-[#121212] tracking-[4%] text-xs font-medium">
          Thicker Span
        </p>
        <p className="font-helvetica text-[#121212] tracking-[4%] text-xs">
          Span Letters
        </p>
      </div>
    </>
  );
};

export default MainPage;

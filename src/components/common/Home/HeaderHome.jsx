function HeaderHome() {
  return (
    <>
      <div className="flex  gap-2  items-center mb-6  justify-between">
        <h1 className="text-[50px] font-bold">Dashboard</h1>
        <div className="flex space-x-4 ">
          <div className="flex gap-3 justify-center items-center px-5 w-[320px] !bg-transparent border-none  ">
            <div className="text-[40px] font-bold">12K+</div>

            <div className=" text-[#919191] font-semibold		">
              Creating and submitting your EOI
            </div>
          </div>
          <div className="flex gap-3 justify-center items-center px-5 w-[320px] !bg-transparent border-none  ">
            <div className="text-[40px] font-bold">81%</div>

            <div className=" text-[#919191] font-semibold		">
              Approval of new requests
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderHome;

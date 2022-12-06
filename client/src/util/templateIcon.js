import { Typography} from "@mui/material";
export const templateIcon = (data) =>{
    

    const template = (fontawesome) =>{
        return(
        <Typography align="center" className="text-xs md:text-lg lg:text-lg xl:text-lg bg-slate-100 rounded-full
          font-bold p-2 mx-2 my-2">
               <i class={fontawesome}></i>
                  &emsp;{data}
           </Typography>
        )
    }


    return(
        //
        data === "Xe máy"? template("fas fa-motorcycle")
        :data === "Đăng ký tạm trú" ? template("far fa-newspaper")
        :data === "Internet" ?template("fas fa-wifi")
        :data === "Phí quản lý" ? template("fas fa-user-shield")
        :data === "Nước sinh hoạt" ?template("fas fa-tint")
        :data === "Phí vệ sinh" ? template("fas fa-trash-alt")
        :data === "Dọn phòng" ? template("fas fa-blanket")
      //  
        :data === "Sofa" ? template("fas fa-couch")
        :data === "Vòi sen" ? template("fas fa-shower")
        :data === "Ban công" ? template("fas fa-container-storage")
        :data === "Bình đun nước" ? template("fas fa-blender")
        :data === "Bàn ăn"  ? template("")
        :data === "Máy lạnh"  ? template("fad fa-air-conditioner")
        :data === "Bàn làm việc"  ? template("")
        :data === "Lò vi sóng"  ? template("far fa-microwave")
        :data === "Bàn ghế"  ? template("fas fa-chair")
        :data === "Máy hút mùi"  ? template("fas fa-vacuum")
        :data === "Nệm"  ? template("far fa-bed-empty")
        :data === "Nước nóng lạnh"  ? template("fas fa-tint")
        :data === "Cửa sổ"  ? template("fas fa-th-large")
        :data === "Tủ lạnh"  ? template("fas fa-refrigerator")
        :data === "Bàn cà phê"  ? template("fas fa-coffee")
        :data === "Bếp điện"  ? template("fas fa-oven")
        :data === "Tivi"  ? template("fas fa-tv")
        :data === "Giường"  ? template("far fa-bed")
        :data === "Tủ quần áo"  ? template("fas fa-cabinet-filing")
        :data === "Máy giặt riêng"  ? template("fad fa-washer")
        :data === "Cửa vân tay"  ? template("fas fa-fingerprint")
    //
        :data === "Hệ thống PCCC"  ? template("fas fa-fire-extinguisher")
        :data === "Thang máy"  ? template("fas fa-sort-circle")
        :data === "Dọn vệ sinh chung"  ? template("")
        :data === "Hệ thống camera"  ? template("fas fa-video")
        :data === "Bãi đậu xe máy"  ? template("fas fa-motorcycle")
        :data === "Tầng hầm"  ? template("")
        :data === "Bảo vệ"  ? template("fas fa-user-shield")
        :data === "Khu vực giặt sấy phơi"  ? template("")
        :data === "Thang bộ"  ? template("")
        :data === "Giờ giấc tự do"  ? template("fas fa-clock")
        :null

    )
    
}
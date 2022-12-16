import React from "react";
import "../../css/pageForbidden.scss";
export const PageForbidden = () => {
  return (
    <div className="bg">
      <div class="text-wrapper">
        <div class="title" data-content="404">
          403 - FORBIDDEN
        </div>

        <div class="subtitle">
          Rất tiếc, Bạn không có quyền truy cập trang này.
        </div>
        <div class="isi">
          Máy chủ web có thể trả về mã trạng thái HTTP bị cấm 403 để phản hồi
          yêu cầu từ khách hàng về trang web hoặc tài nguyên để cho biết rằng có
          thể truy cập và hiểu yêu cầu của máy chủ, nhưng từ chối thực hiện thêm
          bất kỳ hành động nào. Các phản hồi về mã trạng thái 403 là kết quả của
          việc máy chủ web được định cấu hình để từ chối quyền truy cập, vì một
          lý do nào đó, đối với tài nguyên được yêu cầu bởi máy khách.
        </div>

        <div class="buttons">
          <a class="button" className="a" href="/">
            vỀ TRANG CHỦ
          </a>
        </div>
      </div>
    </div>
  );
};

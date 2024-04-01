import { Title } from "@/components";
// import { useParams, useRequest } from "@umijs/max";

/**
 * 视频分区详情页
 */
export default function PartitionInfoPage() {
  // const { partition_id } = useParams();
  // const pid = Number(partition_id)
  // const {data,loading,error} = useRequest(()=>{})
  // TODO 顶部视频基本信息，中部为tab栏，展示分区下的视频和视频分区
  return (
    <div>
      <Title title={{ id: "pages.video.parition.info.title", dv: "视频分区详情" }} />
    </div>
  );
}

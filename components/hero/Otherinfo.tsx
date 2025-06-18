import { LandmarkCardProps } from "@/utils/types";
import { motion } from "framer-motion";

const Otherinfo = ({ landmark }: { landmark: LandmarkCardProps }) => {
    return (
        <motion.div
            className="hidden md:block backdrop-blur-sm bg-black/30 rounded-lg p-4 shadow-md max-w-sm"
            initial={{ opacity: 0, y: 20 }} // เริ่มจางและต่ำกว่าเล็กน้อย
            whileInView={{ opacity: 1, y: 0 }} // 👉 Animate เมื่อ scroll มาเห็น
            viewport={{ once: true }} // 👉 ทำครั้งเดียวพอ (ไม่ animate ซ้ำ)
            transition={{ duration: 0.5, delay: 0.3 }} // 👉 0.5 วิ หน่วง 0.3 วิ
        >
            <div className="text-white space-y-2">
                {/* ชื่อจังหวัด */}
                <p className="text-xs md:text-base font-semibold tracking-wider text-amber-300 uppercase">
                    {landmark.province}
                </p>

                {/* ชื่อสถานที่ */}
                <h1 className="text-xs md:text-xl font-bold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                    {landmark.name}
                </h1>

                {/* คำอธิบายสั้น ๆ */}
                <p className="text-xs md:text-sm text-gray-200 leading-relaxed line-clamp-3">
                    {landmark.description}
                </p>
            </div>
        </motion.div>
    );
};

export default Otherinfo;

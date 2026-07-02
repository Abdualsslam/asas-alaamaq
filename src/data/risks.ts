import {
  Mountain,
  Waves,
  ArrowLeftRight,
  ArrowDown,
  Building2,
  type LucideIcon,
} from "lucide-react";

export interface Risk {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const risks: Risk[] = [
  {
    id: "unstable-soil",
    title: "تربة غير مستقرة",
    description:
      "التربة الضعيفة أو المفككة قد تنهار بشكل مفاجئ وتهدد سلامة الموقع بالكامل.",
    icon: Mountain,
  },
  {
    id: "groundwater",
    title: "مياه جوفية",
    description:
      "ارتفاع منسوب المياه الجوفية يزيد ضغط التربة ويُضعف استقرار جدران الحفر.",
    icon: Waves,
  },
  {
    id: "lateral-pressure",
    title: "ضغط جانبي",
    description:
      "الأحمال الجانبية من التربة المحيطة تتزايد مع العمق وتُهدد الهيكل الداعم.",
    icon: ArrowLeftRight,
  },
  {
    id: "deep-excavation",
    title: "حفريات عميقة",
    description:
      "كلما زاد عمق الحفر، تزداد التحديات الهندسية ومخاطر الانهيار بشكل مضاعف.",
    icon: ArrowDown,
  },
  {
    id: "adjacent-structures",
    title: "منشآت مجاورة",
    description:
      "الحفر بالقرب من مبانٍ قائمة يتطلب دقة عالية لمنع التأثير على أساساتها.",
    icon: Building2,
  },
];

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
  controlMethod: string;
  icon: LucideIcon;
}

export const risks: Risk[] = [
  {
    id: "unstable-soil",
    title: "تربة غير مستقرة",
    description:
      "التربة الضعيفة أو المفككة قد تنهار بشكل مفاجئ وتؤثر على سلامة الموقع بالكامل.",
    controlMethod: "أنظمة سند مصممة حسب ظروف الموقع.",
    icon: Mountain,
  },
  {
    id: "groundwater",
    title: "مياه جوفية",
    description:
      "ارتفاع منسوب المياه يزيد الضغط على جوانب الحفر ويضعف استقرار التربة.",
    controlMethod: "نزح وتصريف لتخفيف الضغط وحماية استقرار الحفر.",
    icon: Waves,
  },
  {
    id: "lateral-pressure",
    title: "ضغط جانبي",
    description:
      "الأحمال الجانبية من التربة والمنشآت المحيطة قد تزيد مع العمق وتهدد نظام الدعم.",
    controlMethod: "أنظمة سند ودعامات مصممة لتحمل ظروف الموقع الفعلية.",
    icon: ArrowLeftRight,
  },
  {
    id: "deep-excavation",
    title: "حفريات عميقة",
    description:
      "كلما زاد عمق الحفر، زادت التحديات الهندسية ومخاطر الانهيار.",
    controlMethod: "تنفيذ مرحلي ومراقبة مستمرة لكل مرحلة.",
    icon: ArrowDown,
  },
  {
    id: "adjacent-structures",
    title: "منشآت مجاورة",
    description:
      "الحفر بالقرب من مبان قائمة يتطلب دقة عالية لمنع التأثير على أساساتها.",
    controlMethod: "دراسة تأثير الحفر وتنفيذ حلول حماية مناسبة.",
    icon: Building2,
  },
];

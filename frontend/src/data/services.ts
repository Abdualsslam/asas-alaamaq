import {
  Shield,
  Layers,
  Droplets,
  Hammer,
  CircleDot,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  titleAr: string;
  titleEn: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    id: "shoring",
    titleAr: "سند الحفريات",
    titleEn: "Shoring Systems",
    description:
      "أنظمة دعم متكاملة لحماية جوانب الحفريات العميقة ومنع انهيار التربة، باستخدام تقنيات مثل الخوازيق الجدارية والألواح المعدنية وفق المعايير الهندسية.",
    icon: Shield,
  },
  {
    id: "shotcrete",
    titleAr: "الشوتكريت",
    titleEn: "Shotcrete",
    description:
      "تطبيق الخرسانة المقذوفة لتثبيت وتغطية أسطح الحفر بسرعة وكفاءة، مما يوفر طبقة حماية فورية للتربة المكشوفة.",
    icon: Layers,
  },
  {
    id: "micropile",
    titleAr: "الميكروبايل",
    titleEn: "Micropile",
    description:
      "خوازيق صغيرة القطر عالية التحمل، تُستخدم في المواقع الضيقة أو ذات الظروف الأرضية الصعبة لنقل الأحمال إلى طبقات التربة المستقرة.",
    icon: CircleDot,
  },
  {
    id: "dewatering",
    titleAr: "نزح المياه",
    titleEn: "Dewatering",
    description:
      "إدارة المياه الجوفية والتحكم بمنسوبها أثناء مراحل الحفر، لضمان بيئة عمل جافة ومستقرة باستخدام أنظمة ضخ متقدمة.",
    icon: Droplets,
  },
  {
    id: "perforated-pipe",
    titleAr: "الأنابيب المثقبة",
    titleEn: "Perforated Pipe",
    description:
      "أنظمة تصريف هندسية باستخدام أنابيب مثقبة لتوجيه المياه الجوفية والسطحية بعيدًا عن منطقة العمل بشكل مُحكم.",
    icon: Hammer,
  },
];

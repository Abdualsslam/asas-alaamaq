export interface HeroStat {
  value: number;
  suffix?: string;
  label: string;
}

// أرقام مبدئية للعرض — عدّلها لاحقًا حسب بيانات الشركة الفعلية.
export const heroStats: HeroStat[] = [
  { value: 10, suffix: "+", label: "سنة خبرة" },
  { value: 20, suffix: "+", label: "مشروع منجز" },
  { value: 18, suffix: "م", label: "أقصى عمق تم تدعيمه" },
  { value: 100, suffix: "%", label: "التزام بالسلامة" },
];

// علامات مسطرة العمق الجانبية في الهيرو
export const depthMarks: string[] = ["3م", "6م", "9م", "12م", "15م", "18م"];

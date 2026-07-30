# تحليل إضافة نظام الموردين إلى منصة تجدد

## 1. الملخص التنفيذي

الفكرة المقترحة ليست مجرد إضافة `SUPPLIER` كنوع مستخدم جديد مع لوحة تحكم، بل تحول معماري وتجاري لمنصة تجدد من متجر مركزي إلى:

> **Managed Hidden Multi-Vendor Marketplace**

أي أن:

- العميل يتعامل مع **تجدد فقط**.
- تجدد هي البائع الظاهر أمام العميل.
- تجدد تستلم الأموال.
- تجدد تدير الطلب، الدفع، التوصيل، الإلغاء، المرتجع، والاسترداد.
- المورد يعمل خلف المنصة كمالك للمنتج والمخزون ومستفيد من صافي المبيعات.
- هوية المورد لا تظهر للعميل نهائيًا.
- المورد يدير منتجاته ومخزونه وعروضه ومبيعاته ومعلوماته المالية من خلال بوابة مستقلة.
- الطلب الواحد يمكن أن يحتوي منتجات من تجدد ومن عدة موردين.
- العميل يستلم الطلب كاملًا مرة واحدة من خلال تجدد.
- المورد لا يتحكم بحالة الطلب ولا المرتجع، ويملك فقط حالتي تجهيز: `PREPARED` و`READY_FOR_PICKUP`، مع إمكانية إرسال بلاغ عدم توفر.

---

# 2. نموذج العمل النهائي

العلاقة الأساسية:

```text
                        العميل
                          │
                          ▼
                 ┌────────────────┐
                 │     تجدد       │
                 │ Storefront/MoR │
                 └────────────────┘
                          │
                    طلب واحد فقط
                          │
            ┌─────────────┴─────────────┐
            ▼                           ▼
      منتجات تجدد                  منتجات الموردين
            │                           │
      مخزون تجدد                   مخزون المورد
            │                           │
            └─────────────┬─────────────┘
                          ▼
                   عمليات تجدد
                          │
                     تجميع الطلب
                          │
                     توصيل واحد
                          │
                          ▼
                        العميل
```

بالنسبة للعميل لا يوجد شيء اسمه Supplier.

العميل يرى فقط:

```text
تجدد
منتج
سلة
طلب
دفع
توصيل
مرتجع
```

ولا يرى:

```text
Supplier A
Supplier B
منتج المورد
شحنة المورد
مستحق المورد
```

---

# 3. القرارات التجارية المغلقة

## 3.1 العلاقة التجارية

- المورد يبيع للعميل من خلال تجدد.
- تجدد هي البائع الظاهر أمام العميل.
- اسم المورد مخفي بالكامل.
- يمكن لأكثر من مورد بيع نفس النوع من المنتج.
- المورد هو كيان Business بغض النظر عن كونه فردًا أو شركة.
- قبول المورد يتم من الإدارة.
- يمكن أيضًا إنشاء المورد يدويًا من لوحة الإدارة.
- المورد له حالات مثل:
  - `PENDING`
  - `ACTIVE`
  - `PAUSED`
  - `SUSPENDED`
  - `REJECTED`
  - `CLOSED`
- المورد يستطيع إيقاف نفسه.
- الإدارة تستطيع إيقافه أو تعليقه.
- أي اتفاقيات أو عقود خاصة تبقى خلف الكواليس ولا تدخل في تجربة النظام الأساسية.

## 3.2 نموذج ربح تجدد

تجدد تربح من:

- عمولة نسبة مئوية من كل عملية بيع.
- رسوم توصيل، مع إمكانية أن تكون مجانية.

لا يوجد في المرحلة الحالية:

- رسوم شهرية.
- رسوم ثابتة لكل طلب.
- عمولة حسب الفئة.
- عمولة حسب المنتج.
- عمولة مركبة نسبة + مبلغ ثابت.

## 3.3 السعر

- المورد يحدد السعر.
- المورد يدخل السعر بالدولار فقط.
- السعر الذي يعتمد ويظهر في النظام هو السعر الذي يظهر للعميل بعد تطبيق نظام المصارفة الحالي.
- الإدارة تستطيع تعديل السعر، مع تسجيل العملية في Audit.
- كل تعديل على بيانات المنتج بعد اعتماده يحتاج مراجعة.
- النسخة المنشورة تبقى ظاهرة حتى تعتمد النسخة الجديدة.
- المورد يستطيع إنشاء عروض.
- العرض لا يصبح فعالًا إلا بعد موافقة الإدارة.
- عمولة تجدد تحسب على **السعر النهائي بعد العرض**.

مثال:

```text
Original Price = $100
Offer Price = $80
Commission = 10%

Tagadod Commission = $8
Supplier Net = $72
```

## 3.4 ملكية المنتجات

تم اعتماد Model B:

> كل مورد ينشئ Product مستقلًا ويملكه.

مثال:

```text
Supplier A
Product #100
CNC Breaker 63A
$10

Supplier B
Product #200
CNC Breaker 63A
$9
```

هما منتجان مستقلان، حتى لو كانا متطابقين.

لكن يمكن إنشاء أداة كشف تشابه فقط للإدارة.

## 3.5 Master Data

تبقى ملكًا لتجدد:

```text
Categories
Brands
Specifications
```

المورد يستطيع:

- القراءة.
- الاختيار.
- استخدامها في منتجاته.

ولا يستطيع:

- الإنشاء.
- التعديل.
- الحذف.

## 3.6 المخزون

منتجات تجدد:

- تبقى مرتبطة بالمخزون الحالي.
- المناطق.
- الشمال والجنوب.
- ONYX.
- المستودعات الحالية.

منتجات المورد:

- لها مخزون منفصل.
- المورد لديه مخزون واحد.
- لا توجد عدة مستودعات في المرحلة الحالية.
- المخزون لا يحتاج موافقة إدارية.
- يدخل مباشرة ضمن Available Stock للعميل.
- يمكن بيع منتج المورد حتى لو لم يكن موجودًا في مخازن تجدد.

## 3.7 الطلبات

الطلب الواحد يمكن أن يحتوي:

```text
منتجات تجدد
+
منتجات Supplier A
+
منتجات Supplier B
```

العميل يرى Order واحد فقط.

رسوم التوصيل واحدة.

التوصيل يتم مرة واحدة بعد تجميع الطلب.

## 3.8 تحكم المورد بالطلب

المورد لا يتحكم بـ Order State Machine.

المورد يستطيع فقط:

```text
PREPARED
READY_FOR_PICKUP
```

كما يستطيع:

```text
REPORT_UNAVAILABLE
```

لكن هذا البلاغ لا يلغي الطلب ولا يغير حالته.

الإدارة وحدها تتخذ القرار.

## 3.9 المرتجعات

- المورد لا يقبل المرتجع.
- لا يرفضه.
- لا يغير حالته.
- الإدارة تدير المرتجع بالكامل.
- المورد يرى فقط المرتجع الخاص بمنتجاته.

ماليًا:

البيع:

```text
Customer Product Amount = $80
Commission = $8
Supplier Net = $72
```

عند Full Return:

```text
Customer Refund = $80
Commission Reversal = -$8
Supplier Reversal = -$72
```

إذا كان المورد قد استلم مستحقه:

```text
Supplier Balance = -$72
```

أو يخصم من مستحقاته القادمة.

## 3.10 المستحقات

المورد لا يستحق المال عند الدفع.

بل:

```text
Order Created        → لا
Paid                 → لا
Processing           → لا
Collected            → لا
Delivered to Customer→ نعم
```

بعد نجاح التسليم يصبح المستحق قابلًا للتصفية مباشرة.

لا توجد Hold Period حاليًا.

## 3.11 Settlement

- الإدارة تنشئ Settlement يدويًا في أي وقت.
- يمكن اختيار فترة زمنية.
- نفس Ledger Entry لا تدخل في Settlement مرتين.
- التصفية يمكن دفعها:
  - جزئيًا.
  - بالكامل.

## 3.12 الدفع للمورد

طرق الدفع مرنة:

```text
Bank Transfer
Wallet
Cash
Manual Payment
Other
```

المورد يمكن أن يسجل حساباته المالية.

الإدارة تعتمدها.

## 3.13 العملة

كل اقتصاد المورد بالدولار فقط.

```text
Product Price USD
Sale USD
Commission USD
Net USD
Wallet USD
Settlement USD
Payout USD
```

ولا يدخل المورد في:

```text
SAR
YER
YER_NEW
FX
Exchange Logic
```

نظام المصارفة الحالي مسؤول عن العميل فقط.

## 3.14 مستخدمو المورد

Supplier ليس User.

بل:

```text
Supplier
   │
   ├── SupplierUser
   ├── SupplierUser
   └── SupplierUser
```

مستقبلًا:

```text
OWNER
MANAGER
PRODUCT_MANAGER
INVENTORY_MANAGER
FINANCE
VIEWER
```

---

# 4. ما هو موجود حاليًا في النظام

الفحص الحالي أظهر أن النظام لديه أساس جيد يمكن البناء عليه.

## 4.1 المستخدمون

`UserRole` الحالي يحتوي:

```text
USER
ADMIN
SUPER_ADMIN
MERCHANT
ENGINEER
```

ولا يوجد Supplier.

ملاحظة مهمة:

`MERCHANT` يمثل العميل التجاري الذي يحصل على خصومات، وليس بائعًا داخل المنصة.

لذلك لا يجب إعادة استخدامه للموردين.

المصدر:

```text
backend-main/src/modules/users/schemas/user.schema.ts
```

## 4.2 المنتجات

Product الحالي لا يعرف مالكه.

لا يوجد:

```text
ownerType
supplierId
```

كما أن:

- `slug` فريد عالميًا.
- `sku` فريد عالميًا.

المصدر:

```text
backend-main/src/modules/products/schemas/product.schema.ts
```

## 4.3 الطلبات

`OrderItem` يحتفظ بسعر وصورة Snapshot.

لكن لا يسجل:

```text
sellerType
supplierId
supplierFinancialSnapshot
lineId
```

المصدر:

```text
backend-main/src/modules/checkout/schemas/order.schema.ts
```

## 4.4 المخزون

هناك بالفعل:

```text
Inventory
Reservation
InventoryLedger
```

وهذا أساس ممتاز.

المصادر:

```text
backend-main/src/modules/checkout/schemas/inventory.schema.ts
backend-main/src/modules/checkout/schemas/reservation.schema.ts
backend-main/src/modules/checkout/schemas/inventory-ledger.schema.ts
```

## 4.5 التسعير والعروض

هناك Price Rules قوية حاليًا يمكن الاستفادة منها، ولكن Supplier Offer يحتاج Approval Ownership مستقل.

المصدر:

```text
backend-main/src/modules/marketing/schemas/price-rule.schema.ts
```

## 4.6 محفظة المهندس

يوجد:

```text
walletBalance
commissionTransactions
```

داخل EngineerProfile.

لكن لا ينصح بإعادة استخدامه للمورد.

المصدر:

```text
backend-main/src/modules/users/schemas/engineer-profile.schema.ts
```

## 4.7 Audit

يوجد نظام Audit يمكن توسيعه.

المصدر:

```text
backend-main/src/modules/audit/schemas/audit-log.schema.ts
```

## 4.8 Web Store

الـProduct وCart في Web لا يعرفان Supplier حاليًا، وهذا جيد جدًا.

المصادر:

```text
web-app-main/src/types/product.ts
web-app-main/src/types/cart.ts
```

وهذا يعني أن تجربة العميل يمكن إبقاؤها شبه كما هي.

---

# 5. Supplier يجب أن يكون Business Entity مستقلًا

لا نعمل:

```text
User
role = SUPPLIER
commission = 10%
balance = ...
```

فقط.

الصحيح:

```text
Supplier
   │
   ├── SupplierMembership
   │      ├── User A
   │      ├── User B
   │      └── User C
   │
   ├── Products
   ├── Inventory
   ├── Offers
   ├── Sales
   ├── Wallet
   ├── Ledger
   ├── Settlements
   └── Payouts
```

---

# 6. Supplier Schema المقترح

```text
Supplier

_id
name

status
commissionRate

salesEnabled
portalEnabled
payoutsEnabled

city
contactInfo

approvedAt
approvedBy

pausedAt
pausedBy

suspendedAt
suspendedBy
suspensionReason

createdAt
updatedAt
```

الحالات:

```text
PENDING
ACTIVE
PAUSED
SUSPENDED
REJECTED
CLOSED
```

---

# 7. لماذا نفصل Status عن Capabilities؟

حتى يمكن مثلًا:

```text
status = ACTIVE
salesEnabled = false
portalEnabled = true
```

وبذلك:

- المورد يدخل لوحة التحكم.
- يرى المبيعات.
- يرى المالية.
- يرى المرتجعات.
- لكن منتجاته لا تقبل مبيعات جديدة.

كما يمكن للإدارة أن توقف:

```text
salesEnabled = false
payoutsEnabled = false
```

من دون حذف المورد أو تعطيل الوصول للبيانات التاريخية.

---

# 8. Supplier Membership

```text
SupplierMembership

supplierId
userId

role
status

createdAt
updatedAt
```

أدوار مستقبلية:

```text
OWNER
MANAGER
PRODUCT_MANAGER
INVENTORY_MANAGER
FINANCE
VIEWER
```

لا ينصح بوضع `supplierId` فقط داخل User.

---

# 9. ملكية المنتجات

نضيف:

```text
ownerType:
  TAGADOD
  SUPPLIER

supplierId?: ObjectId
```

المنتجات الحالية:

```text
ownerType = TAGADOD
supplierId = null
```

منتجات المورد:

```text
ownerType = SUPPLIER
supplierId = supplierId
```

ولا ننشئ Supplier وهميًا باسم تجدد.

---

# 10. SKU وModel B

حاليًا SKU فريد عالميًا.

هذا يتعارض مع الموردين.

الصحيح:

```text
Supplier Product:
supplierId + sku = unique
```

بينما منتجات تجدد يمكن أن تحتفظ بقواعدها الحالية.

يجب أيضًا مراجعة Variant SKU لنفس السبب.

---

# 11. Slug

Slug يبقى فريدًا عالميًا لأنه يستخدم في Public URL.

مثلًا:

```text
/cnc-breaker-63a
/cnc-breaker-63a-a7x2
```

ولا نظهر اسم المورد في الرابط.

---

# 12. Duplicate Detection

لا ندمج المنتجات تلقائيًا.

بل:

```text
Supplier Product Submission
        ↓
Similarity Detection
        ↓
Admin Warning
        ↓
Admin Decision
```

يمكن استخدام:

```text
SKU
Brand
Model
Name
Specifications
Barcode
```

---

# 13. Product Revision / Submission

لا يجب أن يعدل المورد Product المنشور مباشرة.

نحتاج:

```text
SupplierProductSubmission

_id
supplierId

productId?
type:
  CREATE
  UPDATE

payload

status:
  DRAFT
  PENDING
  APPROVED
  REJECTED
  WITHDRAWN

submittedBy

reviewedBy
reviewedAt
rejectionReason

createdAt
updatedAt
```

---

# 14. دورة إنشاء المنتج

```text
Supplier
   ↓
Draft
   ↓
Submit
   ↓
PENDING
   ↓
Admin
   ├── Approve → Product
   └── Reject
```

---

# 15. تعديل المنتج المنشور

```text
Published Product V3
        │
        └──────────────→ يبقى ظاهرًا للعميل

Supplier Revision V4
        ↓
      PENDING
        ↓
      APPROVED
        ↓
Product becomes V4
```

ولا يختفي المنتج الحالي أثناء المراجعة.

---

# 16. Admin تعديل مباشر

الإدارة تستطيع تعديل المنتج مباشرة.

لكن يجب تسجيل:

```text
Audit

oldValue
newValue
performedBy
reason
timestamp
```

---

# 17. Product Data مقابل Inventory

يجب الفصل بينهما.

## Product Data

```text
Name
Description
Images
Specifications
Price
Category
Brand
```

تمر عبر Review.

## Inventory

```text
Stock adjustment
Reservation
Release
Fulfillment
Return
```

Domain مستقل ولا ينتظر Approval.

هذا مهم لمنع Overselling.

---

# 18. مخزون المورد مستقل عن مخزون تجدد

```text
Tagadod Inventory
≠
Supplier Inventory
```

منتجات تجدد:

```text
North
South
Warehouses
ONYX
Regional Pricing
```

منتجات المورد:

```text
Single Supplier Inventory
Manual Source
USD Price
```

---

# 19. Inventory Resolver

ينصح بإنشاء:

```text
InventoryResolver
        │
        ├── TAGADOD
        │       ↓
        │ Existing Inventory
        │ North/South/ONYX
        │
        └── SUPPLIER
                ↓
        SupplierInventory
```

بدل انتشار:

```text
if (supplier) {}
else {}
```

داخل OrderService.

---

# 20. Supplier Inventory Schema

```text
SupplierInventory

supplierId
productId
variantId?

onHand
reserved

updatedAt
```

الحقيقة:

```text
available = onHand - reserved
```

---

# 21. Supplier Inventory Movement

```text
SupplierInventoryMovement

supplierId
productId
variantId?

type
quantity

before
after

orderId?
returnId?

performedBy

idempotencyKey

createdAt
```

الأنواع:

```text
INITIAL
MANUAL_ADJUSTMENT

ORDER_RESERVATION
RESERVATION_RELEASE

FULFILLMENT_OUT

RETURN_RESTOCK

ADMIN_ADJUSTMENT
```

Inventory History لا يحذف.

---

# 22. الحجز

عند إنشاء Order صحيح:

```text
onHand = 20
reserved = 0

Order = 4
```

بعد الحجز:

```text
onHand = 20
reserved = 4
available = 16
```

ولا يتم الحجز عند Cart.

---

# 23. قواعد المخزون

- فشل الدفع → Release Reservation.
- إلغاء الطلب → Release Reservation.
- انتهاء الطلب → Release Reservation.
- المورد لا يستطيع جعل `onHand < reserved`.

---

# 24. الخروج الفعلي من مخزون المورد

عند استلام تجدد المنتج فعليًا من المورد:

```text
onHand -= qty
reserved -= qty
```

لأن المنتج خرج من المورد وأصبح لدى تجدد.

لا ننتظر `Delivered to Customer` لتقليل `onHand`.

---

# 25. Order متعدد المصادر

```text
ORDER #TJ-1000

Line 1 → TAGADOD
Line 2 → SUPPLIER A
Line 3 → SUPPLIER A
Line 4 → SUPPLIER B
Line 5 → TAGADOD
```

العميل يرى Order واحدًا فقط.

---

# 26. لا ننشئ SupplierOrder

لا نريد:

```text
Order
SupplierOrder
SupplierOrderItem
CustomerOrder
```

بل:

```text
Order
 ├── OrderItem
 ├── OrderItem
 └── OrderItem
```

وكل Item يحمل Source.

---

# 27. OrderItem يحتاج Line ID

حاليًا OrderItem لا يملك هوية مستقلة.

نحتاج:

```text
lineId
```

Immutable.

مهم من أجل:

- Returns.
- Supplier Ledger.
- Settlement.
- Fulfillment.
- Mixed Source.
- Duplicate products.
- Idempotency.

---

# 28. OrderItem المقترح

```text
lineId

productId
variantId

qty

basePrice
finalPrice
lineTotal
currency

sellerType
supplierId

snapshot
```

---

# 29. Supplier Financial Snapshot

```text
supplierPricingSnapshot:

unitPriceUSD
linePriceUSD

commissionRate
commissionAmountUSD

supplierNetUSD

offerId?
```

---

# 30. لماذا Snapshot؟

إذا كانت العمولة:

```text
10%
```

وقت البيع، ثم أصبحت:

```text
15%
```

لاحقًا، الطلب القديم يبقى:

```text
10%
```

ولا يعاد حسابه.

---

# 31. USD Snapshot

إذا العميل دفع SAR أو YER:

لا يجوز لاحقًا استخدام سعر الصرف الحالي.

نحفظ:

```text
finalPriceUSD
fxRateSnapshot
exchangeRateVersion
```

وقت الطلب.

---

# 32. Supplier Fulfillment

نحتاج Domain مستقل:

```text
SupplierFulfillment

_id
orderId
supplierId

orderItemLineIds[]

status

preparedAt
readyAt

collectedAt

createdAt
updatedAt
```

---

# 33. حالات Supplier Fulfillment

```text
NEW
PREPARED
READY_FOR_PICKUP
COLLECTED_BY_TAGADOD
```

المورد يستطيع فقط:

```text
NEW
↓
PREPARED
↓
READY_FOR_PICKUP
```

الإدارة فقط:

```text
COLLECTED_BY_TAGADOD
```

---

# 34. Supplier Fulfillment ليست Order Status

قد يكون:

```text
Supplier A → READY
Supplier B → NEW
Tagadod → READY

Order Status = PROCESSING
```

وهذا صحيح.

---

# 35. Admin Aggregation

داخل Order Detail:

```text
ORDER #1000

Tagadod
✓ Ready

Supplier A
✓ Collected

Supplier B
⚠ Preparing
```

ولا يصبح الطلب جاهزًا للتوصيل إلا بعد اكتمال كل المصادر.

---

# 36. التوصيل

```text
Supplier A ──┐
Supplier B ──┼── Tagadod ── Customer
Tagadod ─────┘
```

تجدد تستلم البضاعة من المورد.

ثم تجمع الطلب.

ثم توصله مرة واحدة.

---

# 37. رسوم التوصيل

```text
Products = $100
Shipping = $5

Customer Total = $105
```

المورد والعمولة يتعاملان مع:

```text
$100
```

ولا يدخل Shipping في Supplier Ledger.

---

# 38. بلاغ عدم التوفر

```text
SupplierAvailabilityIssue

supplierId
orderId
lineIds

reason
notes

reportedBy

status:
  OPEN
  RESOLVED
```

ولا يلغي الطلب آليًا.

---

# 39. العمولة

```text
Supplier A = 10%
Supplier B = 7%
Supplier C = 12%
```

Percentage فقط.

---

# 40. مثال مالي

```text
Product Price = $100
Commission = 10%

Gross = $100
Tagadod Commission = $10
Supplier Net = $90
```

---

# 41. العروض

```text
Original Price = $100
Offer Price = $80
Commission = 10%

Commission = $8
Supplier Net = $72
```

---

# 42. Supplier Offer

Supplier Offer يحتاج:

```text
supplierId
productId

originalPrice
offerPrice

status:
  DRAFT
  PENDING
  APPROVED
  REJECTED
  ACTIVE
  EXPIRED

createdBy
reviewedBy
reviewedAt
```

المورد لا ينشئ Offers على Category أو Brand عامة.

فقط منتجاته.

---

# 43. Platform Discounts

يجب التفريق بين:

## Supplier Offer

يموله المورد.

## Platform Coupon

تموله تجدد.

## Merchant Discount

تموله تجدد.

## Shipping Discount

تموله تجدد.

مثال:

```text
Supplier Offer:
$100 → $80

Supplier Net based on $80
```

لو أضافت تجدد Coupon:

```text
Customer pays $75
```

لا يجب تلقائيًا تخفيض Supplier Net إلى أساس $75.

---

# 44. المستحق

عند:

```text
Delivered
```

ننشىء Supplier Ledger Entry.

---

# 45. Supplier Ledger

```text
SupplierLedgerEntry

_id
supplierId

direction:
  CREDIT
  DEBIT

type:
  SALE
  RETURN
  ADJUSTMENT
  PAYOUT

amountUSD

orderId?
orderItemLineId?
returnId?
payoutId?

settlementId?

description

idempotencyKey

createdAt
```

---

# 46. Ledger يجب أن يكون Append-Only

لا يوجد:

```text
edit transaction
delete transaction
```

كل تصحيح يكون Entry جديد.

---

# 47. Idempotency

مثال:

```text
SALE:orderId:lineId
```

Unique.

و:

```text
RETURN:returnId:lineId:event
```

Unique.

حتى لا يتكرر القيد مرتين.

---

# 48. Wallet

Wallet ليست رقمًا هو الحقيقة.

الحقيقة هي:

```text
Ledger
```

والـWallet عبارة عن Projection:

```text
Current Balance
Available
In Settlement
Paid
Negative Balance
```

---

# 49. لا نعيد استخدام Engineer Wallet

Engineer Wallet الحالي بسيط جدًا.

المورد يحتاج:

```text
Partial payout
Settlement
Return after payout
Negative balance
Financial adjustment
Multiple users
Accounting reconciliation
```

لذلك يحتاج Finance Domain مستقلًا.

---

# 50. Settlement

```text
SupplierSettlement

supplierId

periodFrom
periodTo

ledgerEntryIds[]

grossSalesUSD
commissionUSD
returnsUSD
adjustmentsUSD

netPayableUSD

paidUSD
remainingUSD

status

createdBy
createdAt
```

الحالات:

```text
DRAFT
LOCKED
PARTIALLY_PAID
PAID
CANCELLED
```

---

# 51. Settlement لا تخصم الرصيد

Settlement = تجميع وتجميد Entries.

الحدث الذي يخفض الرصيد فعليًا هو:

```text
PAYOUT
```

حتى لا نخصم مرتين.

---

# 52. Supplier Payout

```text
SupplierPayout

supplierId
settlementId

amountUSD

method

destinationAccountSnapshot

reference

status

createdBy
paidAt
```

الحالات:

```text
PENDING
COMPLETED
FAILED
REVERSED
```

---

# 53. الدفع الجزئي

```text
Settlement = $10,000

Payout 1 = $4,000
Remaining = $6,000

Status = PARTIALLY_PAID
```

ثم:

```text
Payout 2 = $6,000

Status = PAID
```

---

# 54. Supplier Payment Accounts

```text
SupplierPaymentAccount

supplierId

type:
  BANK
  WALLET
  CASH
  OTHER

details

status:
  PENDING
  APPROVED
  REJECTED

isDefault
```

---

# 55. المرتجع ماليًا

بيع:

```text
Customer Product Amount = $80
Commission = $8
Supplier Net = $72
```

Ledger:

```text
SALE +72
```

Full Return:

```text
RETURN -72
```

وتجدد تعكس عمولتها:

```text
Commission +8
Commission Reversal -8
```

---

# 56. Negative Supplier Balance

إذا تم دفع $72 للمورد ثم حدث Return:

```text
Supplier Balance = -$72
```

ثم Sale جديدة:

```text
+100
```

الرصيد:

```text
$28
```

---

# 57. Financial Return != Physical Return

هذه نقطة حرجة.

عند:

```text
Customer
→ Tagadod
```

لا يعني أن المنتج عاد للمورد.

إذن نفصل:

## Financial Return

```text
refund customer
reverse supplier payable
reverse commission
```

## Physical Return

```text
Tagadod
→ Supplier
```

وعند تأكيد رجوع المنتج للمورد:

```text
Supplier Inventory +1
```

إذا كان صالحًا للبيع.

---

# 58. Order State Machine

لا نضيف Supplier statuses إلى OrderStatus.

المورد لا يغير:

```text
CONFIRMED
PROCESSING
COMPLETED
RETURNED
REFUNDED
```

بل يغير SupplierFulfillment فقط.

---

# 59. Public APIs

لا يجب أن ترجع:

```text
supplierId
supplierName
```

للعميل.

هذا يشمل:

```text
Storefront
Flutter
Search
Favorites
Product Details
Cart
Checkout
Orders
Returns
```

---

# 60. Storefront الحالي

الـWeb الحالي لا يعرف Supplier.

وهذا إيجابي.

تجربة العميل تبقى:

```text
Browse
Add to Cart
Checkout
Pay
Track
Return
```

والـBackend يدير الموردين خلف الكواليس.

---

# 61. Mixed Inventory Reservation

مثال:

```text
Order

Tagadod      2 units
Supplier A   3 units
Supplier B   1 unit
```

يجب أن تكون العملية:

> All-or-Nothing.

إذا فشل Supplier B:

```text
Rollback Tagadod
Rollback Supplier A
```

ولا ننشئ Order نصف محجوز.

---

# 62. Inventory Reservation Coordinator

ينصح بإنشاء:

```text
InventoryReservationCoordinator
```

مع:

```text
TagadodInventoryAdapter
SupplierInventoryAdapter
```

بدل انتشار الشرطيات في OrderService.

---

# 63. Atomicity

العمليات الحرجة:

```text
Order Creation
Mixed Reservation

Delivered
→ Supplier Ledger

Return
→ Supplier Reversal

Settlement
→ Lock Entries

Payout
→ Debit Balance
```

تحتاج:

- Transactions إن كانت البيئة تدعمها.
- Idempotency.
- Compensating Operations عند الحاجة.

---

# 64. Supplier Portal

لا ينصح بوضع المورد داخل Admin Dashboard الحالي.

يفضل مشروع مستقل:

```text
supplier-dashboard
```

أو:

```text
supplier-portal
```

---

# 65. لماذا Portal منفصل؟

Admin:

```text
يملك ويدير المنصة
```

Supplier:

```text
Tenant داخل المنصة
```

الفصل يقلل:

- تسرب الصلاحيات.
- IDOR.
- عرض Routes إدارية.
- تداخل UX.
- تعقيد الصيانة.

---

# 66. أقسام Supplier Portal

```text
Dashboard

Products
Inventory
Offers

Sales
Returns

Finance
 ├── Wallet
 ├── Ledger
 ├── Settlements
 └── Payouts

Reports

Notifications

Team

Business Profile

Payment Accounts
```

---

# 67. Dashboard المورد

```text
Available Balance
Pending Settlement

Sales This Month

Units Sold

Returns

Products
Active Products
Out of Stock

Pending Product Reviews

Products Requested
Prepared
Ready for Pickup
```

---

# 68. Sales وليس Orders

في Supplier Portal نسمي القسم:

```text
Sales
```

وليس:

```text
Orders
```

لأن Order مملوك لتجدد.

---

# 69. Sales View

```text
Sale #S-1000

Order Ref: TJ-10441
City: Sana'a

Product
Qty: 4

Unit: $10
Total: $40

Status: Processing
```

ولا يظهر:

```text
Customer Name
Phone
Email
Full Address
Payment Information
Other Suppliers
```

---

# 70. Supplier Isolation

Supplier ID يستنتج من:

```text
JWT
↓
SupplierMembership
↓
SupplierId
```

ولا نعتمد على:

```text
GET /supplier/:supplierId/...
```

لإثبات الهوية.

---

# 71. Admin APIs

```text
/admin/suppliers

/admin/suppliers/:id
/admin/suppliers/:id/commission

/admin/supplier-product-reviews

/admin/supplier-offers

/admin/supplier-settlements

/admin/supplier-payouts
```

---

# 72. Supplier APIs

```text
/supplier/me

/supplier/products
/supplier/product-submissions

/supplier/inventory

/supplier/offers

/supplier/sales

/supplier/fulfillments/:id/prepared
/supplier/fulfillments/:id/ready
/supplier/fulfillments/:id/report-unavailable

/supplier/returns

/supplier/wallet
/supplier/ledger
/supplier/settlements
/supplier/payouts

/supplier/notifications

/supplier/team
/supplier/payment-accounts
```

---

# 73. لا نعيد استخدام Admin Product APIs

الإدارة الحالية لديها:

```text
/admin/products
```

هذه تبقى Admin-only.

لا نضيف Supplier إلى نفس Controller.

Supplier Controllers تكون مستقلة.

---

# 74. Notifications

الأحداث:

```text
SUPPLIER_PRODUCT_APPROVED
SUPPLIER_PRODUCT_REJECTED

SUPPLIER_PRODUCT_UPDATED_BY_ADMIN

SUPPLIER_OFFER_APPROVED
SUPPLIER_OFFER_REJECTED

SUPPLIER_SALE_CREATED

SUPPLIER_FULFILLMENT_REQUIRED

SUPPLIER_RETURN_CREATED

SUPPLIER_SETTLEMENT_CREATED

SUPPLIER_PAYOUT_COMPLETED

SUPPLIER_ACCOUNT_PAUSED
SUPPLIER_ACCOUNT_SUSPENDED
```

المرحلة الحالية:

```text
IN_APP only
```

---

# 75. Notifications حسب أدوار المستخدمين

مستقبلًا:

## Finance

```text
OWNER
FINANCE
```

## Product

```text
OWNER
PRODUCT_MANAGER
```

## Inventory

```text
OWNER
INVENTORY_MANAGER
```

---

# 76. Audit

نضيف Resource Types:

```text
SUPPLIER
SUPPLIER_USER

SUPPLIER_PRODUCT
SUPPLIER_PRODUCT_REVISION

SUPPLIER_INVENTORY

SUPPLIER_OFFER

SUPPLIER_LEDGER

SUPPLIER_SETTLEMENT

SUPPLIER_PAYOUT
```

---

# 77. Audit Events الحساسة

```text
Commission changed

Product approved/rejected

Price changed

Inventory adjusted

Supplier paused

Supplier suspended

Settlement created

Settlement cancelled

Payout created/completed/failed

Manual financial adjustment
```

أي Financial Adjustment يجب أن يحتوي:

```text
reason
performedBy
```

---

# 78. ONYX

Supplier Products:

```text
DO NOT sync to ONYX
```

نحتاج:

```text
inventorySource:
  TAGADOD_INTERNAL
  TAGADOD_ONYX
  SUPPLIER_MANUAL
```

---

# 79. Regional Pricing

منتجات تجدد قد تستمر مع:

```text
north
south
```

أما Supplier Product:

```text
Canonical USD Price
```

فقط.

ولا نضيف:

```text
supplier north price
supplier south price
```

في المرحلة الحالية.

---

# 80. إيقاف المورد

عند:

```text
salesEnabled = false
```

النتيجة:

```text
Public listing → hide
Search → hide
Add to cart → reject
Cart sync → invalid
Checkout → reject
```

لكن:

```text
Existing Orders → continue
Returns → continue
Finance → continue
Settlements → continue
Payouts → continue
```

---

# 81. إيقاف منتج

يمكن للمورد إيقاف منتج من المبيعات الجديدة فورًا.

إعادة نشره تعتمد على:

```text
Product approved
Supplier active
sellerEnabled = true
adminEnabled = true
```

---

# 82. Public Product Eligibility

قاعدة موحدة:

```text
Product.status == ACTIVE
AND
Product.isActive == true

AND
Supplier.salesEnabled == true
    if Supplier Product

AND
sellerEnabled == true

AND
approved == true

AND
availableStock > 0
```

ويجب أن تستخدمها كل Public Endpoints.

---

# 83. Returns Integration

المرتجع يجب أن يرتبط بـ:

```text
OrderItem.lineId
```

ويولد:

```text
Customer Refund
Supplier Ledger Reversal
Commission Reversal
Physical Return Flow
```

كل واحد بشكل مستقل.

---

# 84. التقارير

Supplier Reports:

```text
Sales Report
Products Report
Inventory Report
Returns Report

Ledger Statement

Settlement Statement
Payout Statement
```

Formats:

```text
PDF
Excel
```

---

# 85. مؤشرات Dashboard

## Gross Sales

المبيعات التي وصلت Delivered قبل العمولة.

## Net Sales

```text
Gross - Returns
```

## Commission

عمولة تجدد.

## Supplier Earnings

```text
Net Sales - Commission
```

## Available Balance

صافي Ledger غير المدفوع.

---

# 86. Admin Dashboard

قسم جديد:

```text
Suppliers
```

يحتوي:

```text
Overview

Applications
Active
Paused
Suspended

Product Reviews

Offer Reviews

Sales

Returns

Settlements

Payouts

Financial Adjustments

Reports
```

---

# 87. Supplier Detail داخل Admin

```text
Supplier A

Status: Active
Commission: 10%

Products: 145
Active: 130

Sales: $50,000
Commission: $5,000

Current Wallet: $7,500

Unsettled: $2,100

Returns: $900
```

Tabs:

```text
Overview
Products
Inventory
Sales
Returns
Finance
Settlements
Payouts
Users
Audit
Settings
```

---

# 88. Order Detail في Admin

نضيف:

```text
Sources
```

مثال:

```text
TAGADOD
2 Items
✓ Ready

Supplier ABC
3 Items
✓ Ready for Pickup

Supplier XYZ
1 Item
⚠ Not Ready
```

هذه Admin-only.

---

# 89. Web App Impact

التأثير منخفض إلى متوسط.

لا نعيد تصميم تجربة العميل.

التعديلات:

```text
Availability
Price Validation
Cart Validation
Checkout Validation
Mixed Source Handling
```

---

# 90. Flutter Impact

لا نظهر Supplier للعميل.

ولا نضيف:

```text
supplierId
supplierName
```

إلى Customer Contracts العامة إلا إن كان داخليًا ثم يزال في Presenter.

هذا يحافظ على التوافق مع النسخ الموجودة عند العملاء.

---

# 91. Merchant الحالي

يبقى:

```text
Merchant = Business Customer
```

و:

```text
Supplier = Seller
```

لا يدمجان.

---

# 92. Multi-Tenancy

Supplier Portal يصبح Multi-Tenant داخل المنصة:

```text
Platform
   ├── Supplier Tenant A
   ├── Supplier Tenant B
   └── Supplier Tenant C
```

لكن:

```text
Products
Categories
Brands
Orders
```

تبقى Shared Platform Domains.

---

# 93. تقسيم Backend Domains

لا ينصح بعمل Module واحد ضخم.

يفضل:

```text
SuppliersModule

SupplierCatalogModule

SupplierInventoryModule

SupplierFulfillmentModule

SupplierFinanceModule

SupplierReportingModule
```

---

# 94. العلاقة النهائية

```text
User
 │
 ▼
SupplierMembership
 │
 ▼
Supplier
 ├── Products
 │      └── ProductRevision
 │
 ├── Inventory
 │      └── InventoryLedger
 │
 ├── Offers
 │
 ├── Fulfillments
 │
 ├── Ledger
 │
 ├── Settlements
 │      └── Payouts
 │
 └── PaymentAccounts
```

Product:

```text
Product
    │
    ├── TAGADOD
    │
    └── SUPPLIER
             │
             ▼
          Supplier
```

Order:

```text
Order
  │
  ├── Line A → Tagadod
  ├── Line B → Supplier 1
  ├── Line C → Supplier 1
  └── Line D → Supplier 2
```

---

# 95. Invariants الأساسية

هذه يجب اعتبارها قوانين معمارية:

1. العميل لا يرى Supplier.
2. Supplier لا يرى Customer PII.
3. Supplier لا يرى منتجات مورد آخر داخل Order.
4. Supplier لا يغير OrderStatus.
5. Supplier لا يغير ReturnStatus.
6. Supplier لا ينشئ Category/Brand/Specification.
7. Supplier Product لا يصبح Public بدون Approval.
8. السعر المستخدم في Order لا يتغير بعد إنشائه.
9. Commission Snapshot لا يتغير تاريخيًا.
10. Ledger Entry لا تعدل ولا تحذف.
11. Ledger Event لا ينفذ مرتين.
12. Ledger Entry لا تدخل Settlement مرتين.
13. Payout لا يتجاوز Remaining Settlement.
14. Supplier Balance يمكن أن يكون سالبًا.
15. Supplier Stock لا يمكن أن يقل عن Reserved.
16. Mixed Reservation إما تنجح كلها أو تفشل كلها.
17. Supplier Inventory لا يدخل ONYX.
18. Supplier Price داخليًا USD.
19. Shipping Revenue لا يدخل Supplier Ledger.
20. Existing Orders تستمر حتى لو توقف Supplier.

---

# 96. المخاطر الرئيسية

## خطر 1 — المالية

**الخطورة: حرجة جدًا**

لو حسبنا المستحق من Orders في كل مرة بدل Ledger، سنواجه مشاكل مع:

```text
Returns
Partial Payout
Commission Changes
Adjustments
Negative Balance
```

الحل:

> Immutable Supplier Ledger.

## خطر 2 — المخزون

**الخطورة: حرجة**

إعادة استخدام مخزون الشمال/الجنوب للمورد خطأ.

الحل:

> Supplier Inventory Source مستقل.

## خطر 3 — OrderItem

**الخطورة: حرجة**

غياب Line ID وSupplier Snapshot سيجعل Returns والLedger غامضة.

الحل:

> تطوير OrderItem قبل Supplier Finance.

## خطر 4 — Product Review

**الخطورة: مرتفعة**

تعديل Product المنشور مباشرة سيعرض بيانات لم تعتمدها الإدارة.

الحل:

> Revision Workflow.

## خطر 5 — Permissions

**الخطورة: حرجة**

إعطاء Supplier بعض Admin APIs خطر.

الحل:

> Supplier API Surface مستقلة + Membership Isolation.

## خطر 6 — Duplicate SKU

**الخطورة: مرتفعة**

Model B يتعارض مع Global Unique SKU.

الحل:

> Scoped SKU Uniqueness.

## خطر 7 — Refund/Inventory

**الخطورة: حرجة**

إعادة Supplier Stock مباشرة عند Refund خطأ لأن المنتج قد يكون عند تجدد.

الحل:

> فصل Financial Return عن Physical Return.

## خطر 8 — Discounts

**الخطورة: مرتفعة**

Coupons وMerchant Discounts لا يجب أن تغير مستحق المورد بلا Funding Rule.

الحل:

```text
Supplier Offer → Supplier funded
Platform Coupon → Tagadod funded
Merchant Discount → Tagadod funded
Shipping Discount → Tagadod funded
```

---

# 97. حجم التأثير على المشاريع

| المشروع | حجم التغيير |
|---|---|
| Backend | جذري جدًا |
| Database / Mongo Schemas | جذري جدًا |
| Admin Dashboard | جذري |
| Supplier Portal جديد | مشروع كامل جديد |
| Storefront Web | متوسط |
| Flutter Customer App | منخفض–متوسط |
| Landing Page | شبه معدوم |
| Notifications | متوسط |
| Analytics / Reports | كبير |
| QA | جذري جدًا |

---

# 98. خطة التنفيذ المقترحة

## Phase 0 — Contract & Domain Lock

تثبيت:

```text
Ownership
OrderItem Snapshot
Money Definitions
Inventory Ownership
State Machines
Security Invariants
```

قبل أي UI.

---

## Phase 1 — Supplier Identity

```text
Supplier
Membership
Application
Approval
Pause
Suspend
Commission
Payment Accounts
Permissions
```

---

## Phase 2 — Supplier Catalog

```text
Product Ownership
Product Revision
Review
Approval
Duplicate Detection
SKU Changes
Master Data Access
```

---

## Phase 3 — Supplier Inventory

```text
Inventory
Reservations
Movements
Inventory Ledger
Concurrency
Stock Validation
```

مع إبقاء مخزون تجدد الحالي سليمًا.

---

## Phase 4 — Mixed Order Foundation

تطوير:

```text
OrderItem.lineId
sellerType
supplierId
USD Snapshot
Commission Snapshot
```

ثم:

```text
Mixed Reservations
```

---

## Phase 5 — Supplier Fulfillment

```text
SupplierFulfillment

Prepared
Ready for Pickup
Collected

Unavailable Report
```

مع Admin Aggregation.

---

## Phase 6 — Supplier Finance

```text
Supplier Ledger
Sale Credit
Commission
Returns
Adjustments
Negative Balance
Idempotency
```

وهذه أهم مرحلة ماليًا.

---

## Phase 7 — Settlement & Payout

```text
Settlement
Partial Payout
Payment Accounts
Wallet Projections
Statements
```

---

## Phase 8 — Returns Integration

ربط:

```text
Refund
Supplier Reversal
Commission Reversal
Physical Return
Supplier Inventory
```

---

## Phase 9 — Supplier Portal

```text
Dashboard
Products
Inventory
Offers
Sales
Returns
Finance
Reports
Notifications
Team
Settings
```

---

## Phase 10 — Admin Supplier Operations

```text
Supplier Management
Review Queues
Finance
Settlements
Payouts
Order Sources
Returns
Analytics
Audit
```

---

## Phase 11 — Customer Contract Lock

التأكد أن:

```text
Web
Flutter
```

لا تحتاج معرفة Supplier.

كما يتم اختبار النسخ القديمة من التطبيق.

---

## Phase 12 — Final QA

سيناريوهات أساسية:

```text
Tagadod-only order

Supplier-only order

2 suppliers order

Tagadod + supplier

Supplier paused before checkout

Supplier stock becomes unavailable

Mixed reservation rollback

Supplier offer

Price changed after cart

Commission changed after order

Delivered sale ledger

Partial return

Full return

Return after payout

Negative supplier balance

Partial settlement payment

Duplicate settlement protection

Unauthorized supplier access

Cross-supplier IDOR

Customer PII leak
```

---

# 99. القرار المعماري النهائي

الفكرة يجب ألا تنفذ كالتالي:

```text
Add SUPPLIER role
+
Supplier Dashboard
```

بل كالتالي:

```text
                   TAGADOD COMMERCE PLATFORM
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
       Customer          Operations        Suppliers
          │                 │                 │
          │                 │          Supplier Portal
          │                 │                 │
          └──────────── Catalog ──────────────┘
                            │
                     Mixed Inventory
                            │
                          Order
                            │
                   Fulfillment Groups
                            │
                    Tagadod Aggregation
                            │
                         Delivery
                            │
                         Customer

                    Delivered Event
                            │
                            ▼
                    Supplier Ledger
                            │
                    ┌───────┴───────┐
                 Returns         Earnings
                    │                 │
                    └───────┬─────────┘
                            ▼
                       Settlement
                            │
                         Payout
```

---

# 100. الخلاصة

البنية الحالية لا تحتاج إعادة بناء المشروع من الصفر.

لدينا بالفعل:

- Products.
- Variants.
- Order Snapshot.
- Reservations.
- Inventory Ledger.
- Returns.
- Pricing.
- Audit.
- Notifications.
- Admin Dashboard.
- Storefront.
- Flutter.

لكننا نحتاج إضافة طبقة جديدة كاملة:

# Supplier Commerce Domain

وتكون مسؤولة عن:

```text
Identity
→ Catalog
→ Product Review
→ Inventory
→ Mixed Orders
→ Fulfillment
→ Sales
→ Supplier Finance
→ Settlement
→ Payout
→ Supplier Portal
```

وأهم قرارين في التصميم هما:

## 1. Supplier كيان مستقل عن User

حتى يدعم:

- Multi-user.
- Permissions.
- Business identity.
- Financial identity.
- Future scaling.

## 2. Supplier Finance يعتمد على Immutable Ledger

وليس على:

```text
walletBalance
```

أو إعادة حساب Orders كل مرة.

هذا سيمنع أكبر المشكلات المستقبلية في:

- Returns.
- Payouts.
- Negative Balance.
- Commission Changes.
- Adjustments.
- Reconciliation.

---

# 101. النتيجة النهائية

الفكرة قابلة للتنفيذ ومناسبة جدًا لتجدد.

لكنها ليست Feature صغيرة.

هي تطوير لمنصة تجدد من متجر مركزي إلى:

> **منصة تجارة متعددة الموردين مُدارة بالكامل من تجدد، مع بقاء الموردين مخفيين عن العميل، واحتفاظ تجدد بالسيطرة الكاملة على تجربة العميل والطلب والدفع والتوصيل والمرتجع.**

ويجب تنفيذها على مراحل مستقلة، مع إغلاق البنية المالية والمخزون والعقود قبل بناء Supplier Portal النهائي.

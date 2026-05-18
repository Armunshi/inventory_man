import db from "@/prisma/prisma";
import type { CustomFieldType, Prisma } from "@prisma/client";

const DEFAULT_BUSINESS_NAME = "Default Business";
const DEFAULT_SUPPLIER_WORKFLOW_NAME = "Default Supplier PO Flow";

const DEFAULT_SUPPLIER_STAGES = [
  "P.O. Placed",
  "Payment Made",
  "Order Receipt Made",
  "Out For Delivery",
  "Received",
];

export type CustomFieldInput =
  | Record<string, Prisma.InputJsonValue>
  | Array<{ fieldId?: number; key?: string; value: Prisma.InputJsonValue }>;

export async function ensureDefaultBusiness() {
  const existing = await db.business.findFirst({
    orderBy: { id: "asc" },
  });

  if (existing) return existing;

  return db.business.create({
    data: { name: DEFAULT_BUSINESS_NAME },
  });
}

export async function ensureSupplierWorkflow(businessId?: number | null) {
  const business = businessId
    ? await db.business.findUnique({ where: { id: businessId } })
    : await ensureDefaultBusiness();

  const resolvedBusiness = business ?? (await ensureDefaultBusiness());

  const existing = await db.workflowTemplate.findFirst({
    where: {
      businessId: resolvedBusiness.id,
      orderType: "SUPPLIER_ORDER",
      isDefault: true,
    },
    include: {
      stages: { orderBy: { position: "asc" } },
      fieldDefinitions: { orderBy: { id: "asc" } },
    },
  });

  if (existing) return existing;

  return db.workflowTemplate.create({
    data: {
      businessId: resolvedBusiness.id,
      name: DEFAULT_SUPPLIER_WORKFLOW_NAME,
      orderType: "SUPPLIER_ORDER",
      isDefault: true,
      stages: {
        create: DEFAULT_SUPPLIER_STAGES.map((name, index) => ({
          name,
          position: index + 1,
        })),
      },
    },
    include: {
      stages: { orderBy: { position: "asc" } },
      fieldDefinitions: { orderBy: { id: "asc" } },
    },
  });
}

export async function getSupplierWorkflow(templateId?: number | null, businessId?: number | null) {
  if (templateId) {
    const workflow = await db.workflowTemplate.findUnique({
      where: { id: templateId },
      include: {
        stages: { orderBy: { position: "asc" } },
        fieldDefinitions: { orderBy: { id: "asc" } },
      },
    });

    if (workflow) return workflow;
  }

  return ensureSupplierWorkflow(businessId);
}

export function buildCustomFieldCreates(
  customFields: CustomFieldInput | undefined,
  definitions: Array<{ id: number; key: string; type: CustomFieldType }>
) {
  if (!customFields) return [];

  if (Array.isArray(customFields)) {
    return customFields
      .map((field) => {
        const definition = field.fieldId
          ? definitions.find((item) => item.id === field.fieldId)
          : definitions.find((item) => item.key === field.key);

        if (!definition) return null;

        return {
          fieldId: definition.id,
          value: field.value,
        };
      })
      .filter((field): field is { fieldId: number; value: Prisma.InputJsonValue } => Boolean(field));
  }

  return Object.entries(customFields)
    .map(([key, value]) => {
      const definition = definitions.find((item) => item.key === key);
      if (!definition) return null;

      return {
        fieldId: definition.id,
        value,
      };
    })
    .filter((field): field is { fieldId: number; value: Prisma.InputJsonValue } => Boolean(field));
}

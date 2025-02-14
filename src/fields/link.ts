import { deepMerge, Field, GroupField } from "payload";

interface LinkProps {
  disableURLLabel?: boolean;
  overrides?: Partial<GroupField>;
}

const link = ({
  disableURLLabel = false,
  overrides = {},
}: LinkProps = {}): Field => {
  const linkResult: Field = {
    name: "link",
    type: "group",
    admin: {
      hideGutter: true,
      ...(overrides?.admin || {}),
    },
    fields: [
      {
        name: "type",
        type: "radio",
        defaultValue: "internal",
        admin: {
          layout: "horizontal",
        },
        options: [
          { label: "Internal", value: "internal" },
          { label: "Custom", value: "custom" },
        ],
      },
    ],
  };

  const linkTypes: Field[] = [
    {
      name: "reference",
      type: "relationship",
      relationTo: "pages",
      maxDepth: 1,
      admin: {
        condition: (_, siblingData) => siblingData.type === "internal",
      },
      required: true,
    },
    {
      name: "url",
      label: "URL",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData.type === "custom",
      },
      required: true,
    },
  ];

  if (!disableURLLabel) {
    linkResult.fields.push({
      type: "row",
      fields: [
        ...linkTypes,
        {
          name: "label",
          type: "text",
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData.type === "custom",
          },
        },
      ],
    });
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes];
  }

  return deepMerge(linkResult, overrides);
};

export default link;

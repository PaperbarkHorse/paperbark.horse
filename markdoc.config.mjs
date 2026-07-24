import { defineMarkdocConfig, component, nodes } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
    nodes: {
        document: {
            ...nodes.document,
            render: component("./src/components/markdoc/DocArticle.astro"),
        },
        heading: {
            ...nodes.heading,
            render: component("./src/components/markdoc/DocHeading.astro"),
        },
        image: {
            ...nodes.image,
            render: component("./src/components/markdoc/DocImage.astro"),
        },
        link: {
            ...nodes.link,
            render: component("./src/components/markdoc/DocLink.astro"),
        },
    },
    tags: {
        meta: {
            render: component("./src/components/markdoc/DocMeta.astro"),
            attributes: {
                post: {
                    type: "Object",
                },
            },
        },
        section: {
            render: component("./src/components/markdoc/DocSection.astro"),
        },
        note: {
            render: component("./src/components/markdoc/DocNote.astro"),
        },
        button: {
            render: component("./src/components/markdoc/DocButton.astro"),
            attributes: {
                href: {
                    type: "String",
                },
            },
        },
    },
});

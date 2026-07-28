import { Mark } from "@tiptap/core";

const Small = Mark.create({
  name: "small",

  parseHTML() {
    return [
      {
        tag: "small",
      },
    ];
  },

  renderHTML() {
    return ["small", 0];
  },

  addCommands() {
    return {
      toggleSmall:
        () =>
        ({ commands }) =>
          commands.toggleMark(this.name),
    };
  },
});

export default Small;
import { Mark } from "@tiptap/core";

export const QuoteMark = Mark.create({
  name: "quote",

  parseHTML() {
    return [
      {
        tag: "q",
      },
    ];
  },

  renderHTML() {
    return ["q", 0];
  },

  addCommands() {
    return {
      toggleQuote:
        () =>
        ({ commands }) =>
          commands.toggleMark(this.name),
    };
  },
});
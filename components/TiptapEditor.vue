<template>
  <div class="w-full asd border border-gray-400 rounded-xl p-2 focus-within:border-dark-blue">
    <menu-bar :editor="editor" />
    <hr class="bg-gray-400 h-0.5 my-2" />
    <editor-content class="border-none px-3" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { Underline } from '@tiptap/extension-underline';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import { Link } from '@tiptap/extension-link';
import { BulletList } from '@tiptap/extension-bullet-list';
import { Image } from '@tiptap/extension-image';

export default {
  components: {
    EditorContent,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      editor: null,
    };
  },

  watch: {
    value(value) {
      const isSame = this.editor.getHTML() === value;

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
  },

  created() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
        TaskList,
        BulletList.configure({
          HTMLAttributes: {
            class: 'prose',
          },
        }),
        TaskItem.configure({
          nested: true,
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph', 'table'],
        }),
        Underline,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableCell,
        TableHeader,
        Gapcursor,
        Link,
        Image.configure({
          inline: true,
          resizable: true,
        }),
      ],
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML());
      },
      enablePasteRules: false,
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
<style>
.ProseMirror {
  border: none;
  min-height: 400px;
}
.asd {
  min-height: 504px;
}

.ProseMirror:focus-visible {
  outline: none;
}
.ProseMirror h1 {
  font-size: 30px;
}
.ProseMirror h2 {
  font-size: 22px;
}
.ProseMirror ol {
  margin-left: 1rem;
  list-style-type: decimal;
  list-style-position: outside;
}
.ProseMirror ul {
  margin-left: 2rem;
}
.ProseMirror ol {
  margin-left: 2rem;
}
.ProseMirror img {
  float: left;
}
.ProseMirror ul > li::before {
  position: absolute;
  content: '';
  width: 10px;
  height: 10px;
  background-color: gray;
  border-radius: 20px;
  opacity: 0.5;
  top: 9px;
  left: -18px;
}
.ProseMirror table {
  border: 1px solid #ccc;
}
.ProseMirror tr {
  border: 1px solid #ccc;
}
.ProseMirror td,
th {
  border: 1px solid #ccc;
}
.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
.tableWrapper {
  padding: 1rem 0;
  overflow-x: auto;
}
.ProseMirror table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden;
}
.ProseMirror td,
th {
  min-width: 1em;
  border: 2px solid #ced4da;
  padding: 3px 5px;
  vertical-align: top;
  box-sizing: border-box;
  position: relative;
}
.ProseMirror th {
  font-weight: bold;
  text-align: left;
  background-color: #f1f3f5;
}
.ProseMirror .selectedCell:after {
  z-index: 2;
  position: absolute;
  content: '';
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(200, 200, 255, 0.4);
  pointer-events: none;
}
.ProseMirror .column-resize-handle {
  position: absolute;
  right: -2px;
  top: 0;
  bottom: -2px;
  width: 4px;
  background-color: #adf;
  pointer-events: none;
}
.ProseMirror p {
  margin: 0;
}
.ProseMirror a {
  color: #68cef8;
}
</style>

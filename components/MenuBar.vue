<template>
  <div class="flex gap-1 items-center flex-wrap">
    <MenuItem v-for="(item, index) in items" :key="index" :item="item" />
    <button
      type="button"
      class="px-2 rounded-md m-1 font-bold hover:bg-black hover:text-white text-lg"
      title="link"
      @click.stop="setLink"
    >
      <Icon classes=" h-6 w-6 hover:text-white" name="editor/link" />
    </button>
    <button
      type="button"
      :disabled="!editor.isActive('link')"
      class="px-2 rounded-md m-1 font-bold hover:bg-black hover:text-white text-lg"
      title="link"
      @click.stop="editor.chain().focus().unsetLink().run()"
    >
      <Icon classes=" h-6 w-6 hover:text-white" name="editor/unlink" />
    </button>

    <button
      type="button"
      class="px-2 rounded-md m-1 font-bold hover:bg-black hover:text-white text-lg"
      title="image"
      @click="openModal = true"
    >
      <Icon classes=" h-6 w-6 hover:text-white" name="editor/image" />
    </button>
    <Modal :isopen="openModal" @closeModal="openModal = false">
      <Upload />
      <h2 class="text-xl font-bold mt-5 mb-3">Все файлы</h2>
      <transition name="fade" mode="out-in">
        <div v-if="allFiles.length" class="grid customGrid gap-3">
          <div
            v-for="file in allFiles"
            :key="file.name"
            class="transition-all transform hover:scale-105 cursor-pointer square"
            @click="addImageInEditor(file)"
          >
            <FilePreview :file="file" />
          </div>
        </div>
        <p v-else>Файлов пока нет</p>
      </transition>
    </Modal>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
export default {
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      openModal: false,
      items: [
        {
          icon: 'editor/bold',
          title: 'Bold',
          action: () => this.editor.chain().focus().toggleBold().run(),
          isActive: () => this.editor.isActive('bold'),
        },
        {
          icon: 'editor/italic',
          title: 'Italic',
          action: () => this.editor.chain().focus().toggleItalic().run(),
          isActive: () => this.editor.isActive('italic'),
        },
        {
          icon: 'editor/underline',
          title: 'underline',
          action: () => this.editor.chain().focus().toggleUnderline().run(),
          isActive: () => this.editor.isActive('underline'),
        },

        {
          type: 'divider',
        },

        {
          icon: 'editor/h-1',
          title: 'Heading 1',
          action: () => this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: () => this.editor.isActive('heading', { level: 1, class: 'text-2xl' }),
        },
        {
          icon: 'editor/h-2',
          title: 'Heading 2',
          action: () => this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: () => this.editor.isActive('heading', { level: 1, class: 'text-lg' }),
        },
        {
          icon: 'editor/paragraph',
          title: 'Paragraph',
          action: () => this.editor.chain().focus().setParagraph().run(),
          isActive: () => this.editor.isActive('paragraph'),
        },
        {
          icon: 'editor/list-unordered',
          title: 'Bullet List',
          action: () => this.editor.chain().focus().toggleBulletList().run(),
          isActive: () => this.editor.isActive('bulletList'),
        },
        {
          icon: 'editor/list-ordered',
          title: 'Ordered List',
          action: () => this.editor.chain().focus().toggleOrderedList().run(),
          isActive: () => this.editor.isActive('orderedList'),
        },

        {
          icon: 'editor/list-check-2',
          title: 'Task List',
          action: () => this.editor.chain().focus().toggleTaskList().run(),
          isActive: () => this.editor.isActive('taskList'),
        },
        {
          icon: 'editor/align-left',
          title: 'align-left',
          action: () => this.editor.chain().focus().setTextAlign('left').run(),
          isActive: () => this.editor.isActive({ textAlign: 'left' }),
        },
        {
          icon: 'editor/align-center',
          title: 'align-center',
          action: () => this.editor.chain().focus().setTextAlign('center').run(),
          isActive: () => this.editor.isActive({ textAlign: 'center' }),
        },
        {
          icon: 'editor/align-right',
          title: 'align-right',
          action: () => this.editor.chain().focus().setTextAlign('right').run(),
          isActive: () => this.editor.isActive({ textAlign: 'right' }),
        },
        {
          icon: 'editor/align-justify',
          title: 'align-justify',
          action: () => this.editor.chain().focus().setTextAlign('justify').run(),
          isActive: () => this.editor.isActive({ textAlign: 'justify' }),
        },

        {
          type: 'divider',
        },
        {
          icon: 'editor/separator',
          title: 'Horizontal Rule',
          action: () => this.editor.chain().focus().setHorizontalRule().run(),
        },
        {
          icon: 'editor/arrow-go-back-line',
          title: 'Undo',
          action: () => this.editor.chain().focus().undo().run(),
        },
        {
          icon: 'editor/arrow-go-forward-line',
          title: 'Redo',
          action: () => this.editor.chain().focus().redo().run(),
        },
        {
          type: 'divider',
        },
        {
          icon: 'editor/table-line',
          title: 'insert-table',
          action: () =>
            this.editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true, resizable: true })
              .run(),
        },
        {
          icon: 'editor/insert-column-left',
          title: 'insert-column-left',
          action: () => this.editor.chain().focus().addColumnBefore().run(),
        },
        {
          icon: 'editor/insert-column-right',
          title: 'insert-column-right',
          action: () => this.editor.chain().focus().addColumnAfter().run(),
        },
        {
          icon: 'editor/delete-column',
          title: 'delete-column',
          action: () => this.editor.chain().focus().deleteColumn().run(),
        },
        {
          icon: 'editor/insert-row-top',
          title: 'insert-row-top',
          action: () => this.editor.chain().focus().addRowBefore().run(),
        },
        {
          icon: 'editor/insert-row-bottom',
          title: 'insert-row-bottom',
          action: () => this.editor.chain().focus().addRowAfter().run(),
        },
        {
          icon: 'editor/delete-row',
          title: 'delete-row',
          action: () => this.editor.chain().focus().deleteRow().run(),
        },
        {
          icon: 'editor/table-delete',
          title: 'delete-table',
          action: () => this.editor.chain().focus().deleteTable().run(),
        },
        {
          icon: 'editor/merge-cells-horizontal',
          title: 'merge-cells-horizontal',
          action: () => this.editor.chain().focus().mergeCells().run(),
        },
      ],
    };
  },
  computed: {
    ...mapFields('files', ['filesToUpload', 'allFiles', 'curentUploadFiles']),
  },
  methods: {
    setLink() {
      const previousUrl = this.editor.getAttributes('link').href;
      const url = window.prompt('URL', previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      if (url === '') {
        this.editor.chain().focus().extendMarkRange('link').unsetLink().run();

        return;
      }

      // update link
      this.editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    },

    addImageInEditor(file) {
      this.editor.chain().focus().setImage({ src: file.url }).run();
      this.openModal = false;
    },
  },
};
</script>

<style>
.customGrid {
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  grid-auto-rows: 1fr;
}
</style>

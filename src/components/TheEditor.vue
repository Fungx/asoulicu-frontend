<template>
    <div>
        <b-container>
            <h4>编辑器</h4>
            <quill-editor ref="quill" v-model="content" :options="option" class="editor"></quill-editor>
            <b-button v-clipboard:copy="content"
                      v-clipboard:success="onCopySuccess"
                      v-clipboard:error="onCopyError"
                      class="edit-btn" variant="info">复制HTML
            </b-button>

        </b-container>
    </div>
</template>

<script>
    import {quillEditor} from 'vue-quill-editor'
    import Quill from 'quill'

    //Quill内使用style实现不用class
    var DirectionAttribute = Quill.import('attributors/attribute/direction');
    Quill.register(DirectionAttribute, true);
    var AlignClass = Quill.import('attributors/class/align');
    Quill.register(AlignClass, true);
    var BackgroundClass = Quill.import('attributors/class/background');
    Quill.register(BackgroundClass, true);
    var ColorClass = Quill.import('attributors/class/color');
    Quill.register(ColorClass, true);
    var DirectionClass = Quill.import('attributors/class/direction');
    Quill.register(DirectionClass, true);
    var FontClass = Quill.import('attributors/class/font');
    Quill.register(FontClass, true);
    var SizeClass = Quill.import('attributors/class/size');
    Quill.register(SizeClass, true);
    var AlignStyle = Quill.import('attributors/style/align');
    Quill.register(AlignStyle, true);
    var BackgroundStyle = Quill.import('attributors/style/background');
    Quill.register(BackgroundStyle, true);
    var ColorStyle = Quill.import('attributors/style/color');
    Quill.register(ColorStyle, true);
    var DirectionStyle = Quill.import('attributors/style/direction');
    Quill.register(DirectionStyle, true);
    var FontStyle = Quill.import('attributors/style/font');
    Quill.register(FontStyle, true);
    var SizeStyle = Quill.import('attributors/style/size');
    Quill.register(SizeStyle, true);
    //
    export default {
        name: "TheEditor",
        components: {quillEditor},
        methods: {
            onCopySuccess: function () {
                alert('复制成功')
            },
            onCopyError: function () {
                alert('复制失败：')
            }
        },
        data() {
            return {
                content: '',
                option: {
                    modules: {
                        toolbar: [['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                            ['blockquote', 'code-block'],
                            ['link'],
                            [{'header': 1}, {'header': 2}],               // custom button values
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                            [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                            [{'direction': 'rtl'}],                         // text direction

                            // [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
                            [{'header': [1, 2, 3, 4, 5, 6, false]}],

                            [{'color': []}, {'background': []}],          // dropdown with defaults from theme
                            [{'font': []}],
                            [{'align': []}],

                            ['clean']]                                 // remove formatting button]
                    },
                    theme: 'snow'
                }
            }
        }
    }
</script>

<style scoped>
    .editor {
        height: 50vh;
    }

    .edit-btn {
        margin-top: 8vh;
    }
</style>

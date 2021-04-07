<template>
    <div>
        <b-container>
            <h4>编辑器</h4>
            <quill-editor v-model="content" :options="option" class="editor"></quill-editor>
            <b-row col cols-md="2" cols-sm="1">
                <b-col>
                    <b-button v-clipboard:copy="content"
                              v-clipboard:success="onCopySuccess"
                              v-clipboard:error="onCopyError"
                              class="edit-btn" variant="info">复制HTML
                    </b-button>
                </b-col>
            </b-row>

        </b-container>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import {quillEditor} from 'vue-quill-editor'

    export default {
        name: "TheEditor",
        components: {quillEditor},
        methods: {
            onCopySuccess: function () {
                alert('复制成功' )
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

                            [{'header': 1}, {'header': 2}],               // custom button values
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                            [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                            [{'direction': 'rtl'}],                         // text direction

                            [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
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
        margin-top: 56px;
    }
</style>

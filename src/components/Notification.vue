<template>
    <div class="flash notification rounded text-white p-2 px-3 flex justify-around" 
        :class="[ levelClass, isOpen ? isVisibleClass : '']">
        <p class="p-0 m-0">{{ messageText }}</p>
        <div class="delete text-red-500 ml-3" @click="isOpen = false">
        <span class="fas fa-times-circle"></span></div>
    </div>
</template>

<script>
export default {
    props: ['level', 'message'],
    data() {
        return {
            isOpen: false,
            isVisibleClass: 'is-visible',
            closeAfter: 10000,
            levelClass: null,
            messageText: null
        }
    },
    created() {
        if (this.level) {
            this.levelClass = 'bg-' + this.level;
        }
        if (this.message) {
            this.messageText = this.message;
            this.flash();
        }
        let self = this;
        this.$eBus.on(
            'flash', data => self.flash(data)
        );
    },
    methods: {
        flash(data) {
            if (data) {
                this.messageText = data.message;
                this.levelClass = 'bg-' + data.level;
            }

            let self = this;

            setTimeout(() => {
                self.isOpen = true;
            }, 100);

            this.hide();
        },
        
        hide() {
            let self = this;

            setTimeout(() => {
                self.isOpen = false;
            }, self.closeAfter);
        }
    },
}
</script>

<style scoped>
.flash.notification {
    z-index: 99999999999;
    position: fixed;
    top: 20px;
    right: 20px;
    opacity: 0;
    transform: translate(100%);
    transition: all 0.8s ease-in-out;
}

.flash.notification.is-visible {
    transform: translate(0);
    opacity: 1;
}
</style>
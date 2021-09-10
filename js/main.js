Vue.config.devtools = true;

const app = new Vue(
    {
        el: "#root",
        data: {
            currentAvatar: "",
            currentContact: "",
            sendMessage: "",
            friendMessage:"Ciao bello",
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [{
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [{
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_4',
                    visible: true,
                    messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ],
            messageList : [
                "Ehi, Ciao",
                "Ciao bello",
                "Ehilà, come va?",
                "Sto nervoso lasciami stare!!!",
                "Salve, Iscriviti a Boolean",
                "Ciao, buon week-end!",
                "Ciao"
            ]

        },
        mounted() {
            this.currentContact = this.contacts[0];
            this.currentAvatar = `img/avatar${this.currentContact.avatar}.jpg`;
        },
        methods: {
            ImageNumber(index) {
                const image = `img/avatar${this.contacts[index].avatar}.jpg`;
                return image
            },
            changeAvatar(index) {
                this.currentAvatar = `img/avatar${this.contacts[index].avatar}.jpg`;
            },
            select(index) {
                this.currentContact = this.contacts[index];
            },
            newDate() {
                const currentDate = dayjs().format('DD/MM/YYYY HH:mm:ss');
                return currentDate
            },
            addMessage() {
                if (this.sendMessage != "") {
                    this.currentContact.messages.push({
                        date: this.newDate(),
                        message: this.sendMessage,
                        status: "sent"       
                    });
                    this.sendMessage = "";
                    console.log(this.sendMessage);
                }
                this.contactMessage()
            },
            contactMessage() {
                setTimeout(function(){
                    app.currentContact.messages.push({
                        date: app.newDate(),
                        message: app.randomMessage(this.messageList),
                        status: "received"
                    });
                }, 1000);
            },
            randomMessage() {
                return this.messageList[Math.floor(Math.random()*this.messageList.length)];
                
            }
        }
    }
)

console.log(dayjs().format())
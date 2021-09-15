Vue.config.devtools = true;

const app = new Vue(
    {
        el: "#root",
        data: {
            currentAvatar: "",
            currentContact: 0,
            sendMessage: "",
            search:"",
            filtered:"",
            notification: false,
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
            // Array di messaggi random che invierà l'interlocutore.
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
            // Per visualizzare in automatico le informazioni del primo contatto all'avvio dell'index
            this.currentContact = 0;
            this.currentAvatar = `img/avatar${this.currentContact.avatar}.jpg`;

            // Per visualizzare la lista "completa" all'apertura dell'index
            this.filtered = this.contacts;

            // Per far si che cliccando in qualsiasi punto dello schermo si chiuda il dropdown menu
            document.addEventListener("click", function(event) {
                const dropdowns = document.querySelectorAll(".delete-area");
                if (event.target.classList.value != "fas fa-chevron-down") {
                    dropdowns.forEach(element => 
                        {
                            element.classList.remove("display-block")
                        })
                }
            });
        },
        methods: {
            // Per cambiare l'indice dell'img
            ImageNumber(index) {
                const image = `img/avatar${this.filtered[index].avatar}.jpg`;
                return image
            },
            changeAvatar(index) {
                this.currentAvatar = `img/avatar${this.contacts[index].avatar}.jpg`;
            },

            //Per selezionare il contatto attivo al click
            select(index) {
                this.currentContact = index;
            },

            // Per ottenere la data attuale precisa
            newDate() {
                const currentDate = dayjs().format('DD/MM/YYYY HH:mm:ss');
                return currentDate
            },

            // Per inviare un messaggio tramite l'imput e visualizzarlo nella chat corretta
            addMessage() {
                let thisContact = this.contacts[this.currentContact];
                if (this.sendMessage != "") {
                    thisContact.messages.push({
                        date: this.newDate(),
                        message: this.sendMessage,
                        status: "sent"       
                    });
                    this.sendMessage = "";
                }
                this.contactMessage()
            },

            // Per ricevere un messaggio dopo un secondo dal  nostro invio.
            contactMessage() {
                let thisContact = app.contacts[app.currentContact];
                setTimeout(function(){
                    thisContact.messages.push({
                        date: app.newDate(),
                        message: app.randomMessage(this.messageList),
                        status: "received"
                    });
                }, 1000);
            },

            //Per generare un messaggio random. (Per non ricevere solo un "ok" come risposta)
            randomMessage() {
                return this.messageList[Math.floor(Math.random()*this.messageList.length)];   
            },

              // Per ricercare i contatti nella lista contatti tramite input
              searchList() {
                this.filtered = this.contacts.filter(contact => {
                  return contact.name.toLowerCase().includes(this.search.toLowerCase())
                })                
            },

            // Per far comparire il dropdown menu al click
            dropdown(index) {
                const dropdowns = document.querySelectorAll(".delete-area");
                if (dropdowns[index].classList.contains("display-block")) {
                    dropdowns[index].classList.remove("display-block")
                } else {
                    dropdowns[index].classList.add("display-block")
                }
            },

            // Per eliminare il messaggio al click su "Delete Message"
            deleteMessage(index) {
                this.contacts[this.currentContact].messages.splice(index,1)
            },
            // Per abilitare le notifiche (fake)
            enableNotification() {
                this.notification = !this.notification;
                //Per far scomparire il popup dopo 4 secondi.
                const notifActive = document.getElementById("notif-active");
                if(this.notification == true) {
                    setTimeout(function(){                        
                        notifActive.classList.remove("display-block")
                    }, 4000);
                }
            }
        }
    },
)
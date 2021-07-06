## DOCUMENTAZIONE FITBIT-MONITORING-APP

Struttura principale con i contenuti più importanti dell'applicazione:
```
association-api
	│       
	└─── api
	│	│ analysis.php
	│	│ headers.php
	└─── config
	│	│ db_conf.php   
	│ 	.htaccess
	
fitbit-monitoring-app
	│       
	└─── android
	└─── node_modules   
	└─── public
	│   │
	│   └─── assets
	│   │    index.html
	│   
	└─── src
	│   └─── config
	│		│ .env.firebase.ts
	│		│ export.ts
	│		
	│   └─── controllers
	│		│ authCTR.ts
	│		│ ...
	│
	│   └─── router
	│		│ index.ts
	│
	│   └─── theme
	│		│ style.css
	│		│ variables.css
	│
	│   └─── view
	│		│ HomePage.vue
	│
	│	│ App.vue
	│	│ main.ts
	│ 	
	│   tsconfig.json
	│	package-lock.json
	│   package.json
```
### Main Folder
- **association-api**: contiene delle semplici API in PHP che chiamano le api per l'associazione delle regole (statiche per ora).
-  **fitbit-monitoring-app**: contiene tutti i sorgenti del programma. 


## android
Contiene i sorgenti generati in fase di build dell'applicazione con Android Studio.


## node-modules
Contiene tutte le librerie installate/aggiunte


## public 
- Il file *index.html* contiene l'header dell'applicazione con i vari meta tag.
		- La cartella assets contiene invece tutte le immagini utilizzate nell'applicazione.
	> NOTA: per far riferimento ad una immagine da usare, dopo averla messa in questa directory, usare ``/assets/img/example.jpg`` come path relativo.
	Con altri tipi di path (completi o formati in altri modi) Ionic ha problemi.


## src 
- *.env.firebase.ts* è il file contenente le chiavi di configurazione di firebase.
Tali informazioni possono essere reperite andando su Firebase > Impostazioni del Progetto > Generali > Installazione e configurazione degli SDK
> NOTA: In futuro se si volesse cambiare database, dopo aver creato il nuovo progetto firebase e configurato le due/tre cose richieste, bisogna andare a copiare le chiavi di configurazione e sostituirle in questo file.
- *export.ts* per questioni di "pulizia" e organizzazione del codice ho voluto mettere i vari import alle librerie più utlizzate dentro un unico file. 


##  router 
- Il file *index.ts* contiene i vari percorsi delle pagine, quindi ogni volta che si creerà una pagina nuova bisognerà aggiungere a questo array di route quello nuovo, specificando il path (URL a cui si può raggiungere tale pagina), il name e il componente (che sarebbe il link della pagina .vue)
> NOTA: nell'ultima parte del codice di questa pagina c'è un router.beforeEach(....) che essenzialmente va a controllare se nella sessione è settato lo state dell'utente (oggetto popolato dopo che è stato fatto il login), se è settato allora se l'utente punta alla pagina 'login' viene reindirizzato alla home; se invece non è settato correttamente lo state e l'utente prova ad accedere ad una pagina dell'app a questo viene fatto un redirect a home.   


##  theme 
- Il file *variables.css* contiene i colori per il CSS di default di Ionic 
- Il file *style.css* contiene il CSS custom per l'app aggiunto in seguito
TODO: creare nome colori in variables.css


##  controllers
Contiene tutti i vari controller (solitamente per ogni pagina c'è un controller ma non sempre è così).
Per esempio *authCTR.ts* contiene le funzioni del backend della paginad di Login.
Quindi la pagina LoginPage.vue chiama le funzioni all'interno di questo file.
*authCTR.ts* è il controller relativo alla pagina load/download data (ovvero quella per caricare manualmente i file JSON)

- #### authCTR.ts:
	- *Init Firebase*
		 ```
		 if (firebase.apps.length === 0) {
		         firebase.initializeApp(FIREBASE_CONFIG);
		}
		```
		Permette di implementare la connessione a firebase con pattern Singleton.
		L'oggetto state che è di tipo reactive serve per salvare le informazioni dell'utente loggato (è quella usata in ./router/index.ts per il controllo dei permessi sulle pagine).
	
	
	- *Login / Register*
				Nel controller per l'auth ci sono poi altre funzioni tipo *login* e *register* che usano il metodo signInWithEmailAndPassword (nel caso del login) e createUserWithEmailAndPassword (nel caso della registrazione) che sono funzioni proprie della libreria firebase.
				
					> NOTA: Un utente che viene creato con quest'ultima funzione viene aggiunto alla tabella firebase '**Authentication**'.
					Ho preferito far gestire a firebase tutta la parte di login / registrazione perchè così mi risparmiavo tutta parte di sessione dell'utente, etc
					L'unica cosa che ho aggiunto è che quando un utente si registra all'app, oltre a venire creato un nuovo record nella pagina di Authentication, viene creato anche un nuovo record in una seconda tabella '**users**' a livello di database perchè così riesco a salvarmi più informazioni (cf, nome, cognome, etc).

	-	*authCheck ()*	
			E' eseguito durante lo startup dell'app ( viene lanciato nel file ./src/main.ts ) e serve per inizializzare l'utente popolando la l'oggetto state con le sue informazioni

- #### userCTR.ts:
	- *getBaseUserInfo ()*
				E' una semplice funzione che mi ritorna un oggetto di tipo **firebase.User** con tutte le informazioni di base dell'utente. In particolare, l'oggetto ritornato, contiene la proprietà uid che identifica il maniera univoca lo user.
				In tutte le query che richiedono di filtrare il risultato per utente uso infatti
				``getBaseUserInfo()?.uid``
					> 	NOTA: getBaseUserInfo richiama a sua volta la metodo di firebase firebase.auth().currentUser la quale va a prendere le informazioni dalla tabella di auth.
					Per avere invece tutte le altre informazioni custom dell'utente (altezza, nome, cognome, cf etc) vedere l  funzione getAllUserInfo()
	
	- *getAllUserInfo ()*
				Funzione simile a quella precedente ma in questo caso va a prendere i dati dalla collezione **users** e da alcune altre collezioni (peso dell'utente, immagine profilo dell'utente) contenente codice fiscale, nome, cognome, altezza e varie informazioni secondarie.
				Questo metodo è richiamato dalla pagina ProfilePage.vue.

	- *setProfileImage ( img )*
				Funzione che riceve in input l'immagine caricata dall'utente e va a caricare sullo storage di firebase.
				Per importare lo storage service dell'app ho creato un oggetto di tipo Storage
				`` const storage = firebase.storage(); `` 
				E poi ho richiamato su di esso l'attributo ref:
				`` const storageRef = storage.ref(); `` 
				Che ritorna un riferimento per il path dato nel default bucket.
				Facendo quindi:
				 ```
				const imagesRef = storageRef.child(
			        "profilePictures/" + getBaseUserInfo()?.uid
			    ); 
			    ```
				Mi prendo il riferimento del file che ha come nome lo uid dell'utente ed è posto nella cartella *profilePictures* e quindi posso fare un put (aggiungere) l'immagine.
				> NOTA: per comodità ho voluto chiamare l'immagine con lo uid dell'utente facilitando il rintracciamento dell'immagine profilo legata al profilo.
				> NOTA: Dopo aver fatto l'upload dell'immagine ho salvato l'URL di quella nuova nel localstorage: `localStorage.setItem("imageURL", value);`
				così facendo non ho problemi di cache e dopo che l'utente ha fatto l'upload e viene aggiornata la pagina, c'è già la nuova foto salvata.


	- *getProfileImage ()*
					Funzione simile alla precedente ma che ritorna solo l'URL dell'immagine.
					Come prima si prende la reference all'immagine sullo storage di firebase e poi richiama la funzione **getDownloadURL()** che restituisce l'URL accessibile dall'esterno per scaricare la foto.


	- *deleteAccountInfo ()*
					Metodo che permette di cancellare la propria utenza e i propri dati registrati nell'app.
					Cancella dunque da tutte le collezioni i documenti con uid dell'utente, la foto profilo caricata dall'utente ed infine con il metodo di firebase delete() cancella anche l'utenza creata nell'auth page.


- #### weightCTR.ts:
	- *getLastWeight ()*
	Metodo che mi ritorna l'ultimo peso che ha registrato l'utente.
		>	NOTA: per prendermi l'ultimo peso dell'utente faccio un order desc per dateTime dei documenti e poi un limit 1.
		Per farlo però è necessario creare un indice sulla tabella weights da firebase. 
		
	- *getWeights ()*
		Metodo che mi ritorna gli ultimi 10 pesi registrati dell'utente che verrano mostrati nel grafico nella pagine del tracking peso.
		Per ogni documento creo un oggetto di tipo Weight e lo vado ad inserire in un array.
		
	- *addWeight ()*
		Metodo semplicemente aggiunge un peso relativo all'utente loggato
	
- #### dataCTR.ts:
	- *saveUserActivity (JsonData, tipoAttività)*
	Funzione  serve per importare i dati manualmente da un file JSON. Essa prende come parametri il contenuto di un file JSON caricato dall'utente e la tipologia di attività. Prima di caricare i nuovi dati va a cancellare tutti quelli già presenti per quell'utente (si presuppone non sia un file parziale).
		>	NOTA: ogni documento di ogni collezione fa riferimento all'utente grazie all'uid, codice unico per ogni utente.
		
	- *getUserActivity ()*
	Funzione che serve per esportare gli attuali dati: l'utente seleziona la tipologia di attività che vuole esportare e viene ritornato un file JSON.
	

- #### statisticsCTR.ts:
	- *getStatistics (periodo)*
	Funzione che prende come parametro il periodo e ritorna tutti i dati dei quattro tipo di attività dell'utente. I dati sono salvati su firebase come minuti / giorno quindi per le statistiche ho fatto un calcolo (molto approssimativo) per ricavare la distanza percorsa dai minuti.
		```
		* Sedentary Activity: ~ 2 Km/h
				-> 1 min  ~ 33 metri
		* Light Activity: ~ 4 Km/h
				-> 1 min  ~ 67 metri
		* Moderate Activity: ~ 8 Km/h
				-> 1 min  ~ 133 metri
		* Intense Activity: ~ 13 Km/h
				-> 1 min  ~ 217 metri
		```


- #### goalsCTR.ts:
	- *getDailyActivitiesData ()*
	Funzione che ritorna i minuti percorsi dall'utente per ogni tipo di attività del giorno corrente.
		> NOTA: 
		Come **startDate** creo un oggetto di tipo Date e con
		`` date.setHours(0, 0, -1); ``
		Setto la data corrente alle ore 00:00:00 ma a cui sottraggo 1 secondo
		Quindi vado al giorno precedente alle ore 23:59:59
		Come **endDate** use sempre l'oggetto di tipo Date ma con
		`` date.setHours(48, 0, -1);``
		aggiunto 48 ore, vado al giorno successivo alle ore 00:00:00 e quindi sottraggo 1
		secondo ottenendo le ore 23:59:59 del giorno corrente.
		Avrò quindi un filtro di tutti i dati con dati > startDate e <= di endDate

	- *getDailyActivitiesGoals ()*:
		Mi ritorna tutti gli obiettivi settati dall'utente (gli obiettivi sono salvati nella collezione **activityGoals**)
		
	- *updateDailyActivityGoal (tipoAttività, minuti)*:
		Funzione che ha come parametro il tipo di attività e i minuti che l'utente si è posto come obiettivo. Prima di andare ad inserirlo nella collezione verifico se l'utente aveva già posto un obiettivo e nel caso lo cancello.

		> NOTA: in alcune parti, lato controller, dopo aver aggiornato i dati (ad esempio in questo caso che l'utente ha degli obiettivi e li aggiorna), faccio un 
		`` location.reload(true);``
		per forzare l'aggiornamento della pagina con i dati nuovi.
		Il prossimo step sarebbe quello di evitare l'aggiornamento dell'intera pagina ma solo dei dati perchè così non è il massimo.


- #### reportCTR.ts:
	- *getActivityTimeWithRange()*
				Metodo che ritorna tutte le attività dato un range (anche se per ora il range è fisso)
				Faccio un foreach delle collezioni e per ognuna di esse mi prendo le attività svolte nel periodo scelto.
				Il risultato lo metto dentro ad un array fatto di oggetti di tipo Activity
				A sua volta, l'array risultante contenente tutti i valori di una attività lo metto in un array di array result che poi sarà quello che verrà ritornato dalla funzione.


##  view
Contiene tutti i file lato fronend, quindi le view.
Ogni file è così strutturato:
 - \<template>\</template> 
	 >		Contiene i componenti Ionic/Vue.js per la grafica
 - imports
	 >		Contiene i vari import dei componenti usati nella grafica (IonButtons, IonContent, etc) e anche le funzioni definite nei CTR
 - export default defineComponent
	 - name
		 >		Contiene il nome della pagina visualizzata
	 - data()
		 >		Contiene un return con tutte le variabili globali definite prima e utilizzate
	 - methods
	 	 >		Contiene i vari metodi frontend (solitamente per controllo dati iniziale etc che poi richiamano i metodi backend (nei controller)
	 - mounted()
		 >		Contiene il codice che viene eseguito non appena la pagina ha finito di essere renderizzata, caricata
	 - setup()
	> 		Solitamente usato per passare le icons


Per segnalare all'utente un errore o un'azione andata a buon fine uso il metodo **openToast** che ho definito nella pagina App.vue
``AppVue.methods?.openToast("Errore nel salvataggio: " + error); ``


## TODO LIST
Di seguito alcuni punti che hanno necessità di essere implementati / sistemati:
- Come database è stato utilizzato firebase ma esso è a pagamento. Facendo una stima molto approssimativa, ipotizzando ci siano 100 utenti registrati e che utilizzano quotidianamente l'app, ipotizzando che ognuno di essi usi l'app simulando richieste che effettuano 500 letture, in totale risultano 50000 letture complessive, a fronte delle 30 000 gratuite offerte da firebase.
Per questo motivo è stato pensato di migrare base di dati e passare a Redis come prossima release (anche se firebase è più performante...) (implica rifare select / insert / update lato backend)

- Nel controller della pagina SleepPage è presente una chiamata API a quelli che dovrebbero essere gli algoritmi per le regole di associazione del sonno.
La chiamata API è statica, restituisce sempre il solito output.
Bisogna dunque integrare la parte fatta dall'altro studente (che attualmente non è terminata) in modo tale che, a fronte di un input es un file JSON, restituisca le corrette regole di associazione.
Nella cartella association-api che contiene la parte PHP per le richieste, sono presenti due file zip con al loro interno i rispettivi template di input e output.

- Altre migliorie: 
	- nella pagina Report il filtro non funziona benissimo e non prende correttamente le date in input. 
	- nella pagina LoadData la parte di Download dati è predisposta, ma è da valutare se completarla o rimuoverla in quanto è utile solo per la fase di sviluppo e debug (vedi punto dopo)

- Per collegare un progetto nuovo di firebase all'applicazione, copiare in .env.firebase.ts le chiavi che firebase genera automaticamente.
In teoria firebase crea in automatico i documenti, quindi non cè bisogno di nessuna struttura / dump  del db

- Per testare l'app su device io ho usato android studio (per i comandi che ho eseguito fare riferimento all'altra doc .md, in particolar modo agli ultimi tre comandi per la build e compilazione)

- Attualmente i dati sono file JSON caricati (vedi zip fitbit_project_input) in modo statico, quindi l'utente dovrebbe caricare a mano ogni giorno il file JSON.
Non essendo in possesso di un fitbit non ho potuto realizzare la parte di caricamento dinamico, ma questo è possibile chiamando periodicamente le API di fitbit.
Di seguito alcuni link utili:
	- https://dev.fitbit.com/build/reference/web-api/explore/#/Body%20and%20Weight
	
	- https://community.fitbit.com/t5/Web-API-Development/How-do-I-register-an-app-if-I-don-t-have-a-website/td-p/744575
	
	- https://dev.fitbit.com/build/reference/web-api/

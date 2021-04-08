## CREAZIONE APP MOBILE DA PROGETTO IONIC
Per creare l'APK è necessario avere installato **Android Studio** e **Capacitor**.
Mentre, per generare un file IPA, quindi eseguibile e installabile su iOS è necessario avere installato **Xcode** e **Capacitor**.

##### INSTALLAZIONE CAPACITOR:
-	`npm install @capacitor/core @capacitor/cli` 

##### INSTALLAZIONE ANDROID STUDIO:
-	*https://developer.android.com/studio* 

##### INSTALLAZIONE XCODE 12:
-    *https://developer.apple.com/xcode/*


### PROCEDURA PER ANDROID:

-	`npx cap init`
> (will prompt you to enter the name of your app and the app id)

-	`npx cap add android`

-	`npx cap open android`

NOTA: Dopo averlo indicizzato su android studio, è necessario fare il signing dell'APK, andando in Build > Generate Signed Bundle / APK, selezionare APK e creare una nuova keystore.
Selezionare il tipo di build (debug o release) e la cartella output

- `keytool -importkeystore -srckeystore C:\Users\mirgi\Desktop\tirocinio\fitbit-monitoring app\android\keys\fitbit-keystore.jks -destkeystore C:\Users\mirgi\Desktop\tirocinio\fitbit-monitoring-app\android\keys\fitbit-keystore.jks -deststoretype pkcs12`


LINK UTILI: https://developer.android.com/studio/publish/app-signing#generate-key



#### PER RIFARE LA BUILD:

-	`npx run build`

-	`npx cap init`

-	`npx cap add android`

-	`npx cap open android`


#### PER RIFARE LA BUILD:

-   `ionic build --watch`

-   `ionic capacitor build android`

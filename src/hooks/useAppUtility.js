const nameApp = import.meta.env.VITE_APP_NAME;

export const useAppUtility = () => {
    const isMovil = Boolean(window.cordova);

    const alertar = ({txtMessage, callback}) => {
        const callbackExists = typeof callback === 'function';
        if(isMovil){
            window.navigator.notification.alert(txtMessage, callbackExists ? callback : null, nameApp, "LISTO");
            return;
        }

        alert(txtMessage);
        if (callbackExists){
            callback();
        }
    };

    const confirmar = ({txtMessage, onConfirm, onReject}) => {
        const fnOK = function(index){
            if (typeof onConfirm === 'function'){
                if (index === 1){
                    onConfirm();
                    return;
                } 

                if (typeof onReject === 'function'){
                    onReject();
                }
                return;
            } 
            console.error("Función de confirmación inválida.");
        };


        if (isMovil){
            window.navigator.notification.confirm(txtMessage, fnOK, nameApp, ["ACEPTAR", "CANCELAR"]);
            return;
        }

        const answer = confirm(txtMessage) === true ? 1 : 0;
        fnOK(answer);
    };

    const getDevice = ()=>{
        if (isMovil){
            return window.device.uuid;
        }

        return navigator.userAgent.substr(0,30);
    };

    const isActivatedGPS = ({onSuccess, onError}) => {
        if (isMovil){
            window.CheckGPS.check(onSuccess,onError);
            return;
        }
        
        onSuccess();
    }

    const checkPermissions = ({ requiredPermissions, onGranted, onDenied }) => {
        const cadenaInformativaDePermisos = ()=>{
            return `Esta aplicación necesita permisos de: ${requiredPermissions.join()} para funcionar correctamente.`;
        };

        if (!isMovil){
            console.error(cadenaInformativaDePermisos());   
            return;
        }

        const permissions = window.cordova.plugins.permissions;
        const permissionList = requiredPermissions.map(function(permission){
          return permissions[permission];
        });
        const error = ()=>{
            alertar({txtMessage: cadenaInformativaDePermisos()});
        };
         
        const success = ( status ) => {
          if( !status.hasPermission ) {
            permissions.requestPermissions(
                permissionList,
                (status) => {
                    if( !status.hasPermission ) {
                        if (onDenied != null && (typeof onDenied === 'function')){
                            onDenied();
                        } else {
                            error();
                        }
                        } else {
                        if (onGranted != null && (typeof onGranted === 'function')){
                            onGranted();
                        }
                    }
                },
                error);
          } else {
            if (onGranted != null && (typeof onGranted === 'function')){
              onGranted();
            }
          }
        };

        permissions.hasPermission(permissionList, success, null);
    };

    const geoposition = ({onSuccess, onError}) => {
        const fnSuccess = (posicion) => {
            if (typeof onSuccess === 'function'){
                onSuccess(posicion);
                return;
            }
            console.error("Función de éxito inválida.");
        };
        const showError = (error) => {
            switch(error.code) {
                    case error.PERMISSION_DENIED:
                    console.error("Permisos rechazados.");
                    break;
                    case error.POSITION_UNAVAILABLE:
                    console.error("Información del lugar inaccesible.");
                    break;
                    case error.TIMEOUT:
                    console.error("No encontré posición GPS.");
                    break;
                    case error.UNKNOWN_ERROR:
                    console.error("Error desconocido.");
                    break;
            }
        };
        const fnError = (error) => {
            showError(error);
            if (typeof onError == 'function'){
                onError();
                return;
            } 
            console.error("Función de error inválida.");
        };
        

        if (window.navigator.geolocation){
            window.navigator.geolocation.getCurrentPosition(fnSuccess, fnError, { enableHighAccuracy: true, maximumAge: 5000,timeout: 15000 }); 
            return;
        }
        alert("No tengo la función de geolocación disponible en este dispositivo.");
    };

    const geopositionWatch = ({onSuccess, onError}) => {
        const fnSuccess = (posicion) => {
            if (typeof onSuccess === 'function'){
                onSuccess(posicion);
                return;
            }
            console.error("Función de éxito inválida.");
        };
        const showError = (error) => {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                alert("Permisos rechazados.");
                break;
                case error.POSITION_UNAVAILABLE:
                alert("Información del lugar inaccesible.");
                break;
                case error.TIMEOUT:
                alert("No encontré posición GPS.");
                break;
                case error.UNKNOWN_ERROR:
                alert("Error desconocido.");
                break;
            }
        };
        const fnError = (error) => {
            //showError(error);
            if (typeof onError == 'function'){
                onError();
                return;
            } 
            console.error("Función de error inválida.");
        };
        
        if (window.navigator.geolocation){
            return window.navigator.geolocation.watchPosition(fnSuccess, fnError, { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }); 
        }
        console.error("No tengo la función de geolocación disponible en este dispositivo.");
        return null;
    };

    const clearGeopositionWatch = (watchID) => {
        try {
            window.navigator.geolocation.clearWatch(watchID);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const barcodeScan = ({onSuccess, onError, options = {}}) => {
        if (!isMovil){
            alert("No tengo la función de LECTOR DE CÓDIGO DE BARRAS disponible en esta versión de plataforma de este aplicativo.");
            return;
        }

        const fnSuccess = (result) => {
            if (typeof onSuccess === 'function'){
                onSuccess(result);
                return;
            }
            console.error("Función de éxito inválida.");
        };
        const fnError  = (error) => {
            showError(error);
            if (typeof onError == 'function'){
                onError();
                return;
            } 
            console.error("Función de error inválida.");
        };
        const showError = (error) => {
          alert("Scanning failed: " + error);
        };
        const barcodeScannerInstance = window.cordova.plugins.barcodeScanner;

        if (!barcodeScannerInstance){
            alert("No tengo la función de LECTOR DE CÓDIGO DE BARRAS disponible en este dispositivo.");
            return;
        }

        barcodeScannerInstance.scan(fnSuccess, fnError, 
            {
              preferFrontCamera : false, // iOS and Android
              showFlipCameraButton : true, // iOS and Android
              showTorchButton : true, // iOS and Android
              torchOn: true, // Android, launch with the torch switched on (if available)
              saveHistory: false, // Android, save scan history (default false)
              prompt : options?.prompt || "Coloque un código sobre el área de escaneo.", // Android
              resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
              formats : options?.formats || "QR_CODE, PDF_417", // default: all but PDF_417 and RSS_EXPANDED
              orientation : options?.orientation || "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
              disableSuccessBeep: options?.disableSuccessBeep || false // iOS and Android
            }); 
    };

    const checkConexion = () => {
        if (!isMovil){
            return {online: window.navigator.onLine, estados: null};
        }

        const networkState = window.navigator.connection.type;
        let states = {};
        states[window.Connection.UNKNOWN]  = 'Conexión Desconocida';
        states[window.Connection.ETHERNET] = 'Conexión Ethernet';
        states[window.Connection.WIFI]     = 'Conexión WiFi';
        states[window.Connection.CELL_2G]  = 'Conexión 2G';
        states[window.Connection.CELL_3G]  = 'Conexión 3G';
        states[window.Connection.CELL_4G]  = 'Conexión 4G';
        states[window.Connection.CELL]     = 'Conexión generica';
        states[window.Connection.NONE]     = 'Sin conexión red';
        return {online: (networkState != window.Connection.NONE), state: states[networkState]};
    };


    const checkUpdate = ()=>{
        if (!isMovil){
            return false;
        }

        const updaterURL = `${import.meta.env.VITE_UPDATER_URL}`;
        window.AppUpdate.checkAppUpdate((e) => { console.log(e);}, 
                                        (e) => { console.error(e);}, 
                                        updaterURL);

    };

    const getAppVersion = ()=>{
        if (!isMovil){
            return '-';
        }

        return window.AppVersion.version;
    }

    return {
        alertar,
        barcodeScan,
        checkConexion,
        checkPermissions,
        checkUpdate,
        clearGeopositionWatch,
        confirmar,
        getDevice,
        geoposition,
        geopositionWatch,
        isActivatedGPS,
        getAppVersion
    }
}
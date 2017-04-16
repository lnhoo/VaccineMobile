document.addEventListener("plusready", function() {
	var _BARCODE = 'D9Plugin',
		B = window.plus.bridge;
	var D9 = {
		scanQrCode: function(Argus1, Argus2, Argus3, Argus4, successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null : function(args) {
					successCallback(args);
				},
				fail = typeof errorCallback !== 'function' ? null : function(code) {
					errorCallback(code);
				};
			callbackID = B.callbackId(success, fail);

			return B.exec(_BARCODE, "scanQrCode", [callbackID, Argus1, Argus2, Argus3, Argus4]);
		}
	};
	window.plus.D9Plugin = D9;
}, true);
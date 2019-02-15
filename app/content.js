(function () {
    var macAddress;
    macAddress = localStorage.getItem('macAddress');
    alert(macAddress);
    // 如果localStorage 存在macAddress
    if (!macAddress){
        // 如果不存在监听popup通信
        chrome.runtime.onMessage.addListener(
            function (request, sender, sendResponse) {
                chrome.storage.local.get(['macAddress'], function (result) {
                    localStorage.setItem('macAddress', result.macAddress);
                });
                if (request.setted == "1")
                    alert('getted macAddress');
                return true;
            });
    }
})()





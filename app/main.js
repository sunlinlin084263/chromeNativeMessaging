// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


(function () {
    var port = null;
    var getKeys = function(obj){
        var keys = [];
        for(var key in obj){
            keys.push(key);
        }
        return keys;
    }


    // function appendMessage(text) {
    //     document.getElementById('response').innerHTML += "<p>" + text + "</p>";
    // }

    // function updateUiState() {
    //     if (port) {
    //         document.getElementById('connect-button').style.display = 'none';
    //         document.getElementById('input-text').style.display = 'block';
    //         document.getElementById('send-message-button').style.display = 'block';
    //     } else {
    //         document.getElementById('connect-button').style.display = 'block';
    //         document.getElementById('input-text').style.display = 'none';
    //         document.getElementById('send-message-button').style.display = 'none';
    //     }
    // }

    function sendNativeMessage() {
        message = {"text": document.getElementById('input-text').value};
        port.postMessage(message);
        // appendMessage("Sent message: <b>" + JSON.stringify(message) + "</b>");
    }

    function onNativeMessage(message) {
        alert("we");
        // appendMessage("Received message: <b>" + JSON.stringify(message) + "</b>");
        alert(JSON.stringify(message));
        chrome.storage.local.set({macAddress: message.text},function(){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                // 1 表示local 存储成功
                chrome.tabs.sendMessage(tabs[0].id, {setted: "1"}, function(response) {
                });
            });
        });
    }

    function onDisconnected() {
        // appendMessage("Failed to connect: " + chrome.runtime.lastError.message);
        port = null;
        // updateUiState();
    }

    function connect() {
        var hostName = "com.google.chrome.example.echo";
        alert(123);
        // appendMessage("Connecting to native messaging host <b>" + hostName + "</b>")
        port = chrome.runtime.connectNative(hostName);
        port.onMessage.addListener(onNativeMessage);
        port.onDisconnect.addListener(onDisconnected);
        // updateUiState();
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('connect-button').addEventListener(
            'click', connect);
        // document.getElementById('send-message-button').addEventListener(
        //     'click', sendNativeMessage);
        // updateUiState();
    });

})()


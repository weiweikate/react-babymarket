/**
 * Created by coin on 3/31/17.
 */

let loadMlink = () => {
    var btn_1 = document.querySelector("a#invite_download0");
    var btn_2 = document.querySelector("a#invite_download1");

    var options = [
        {
            mlink: "AKXd",
            button: btn_1,
            autoLaunchApp:false,
            autoRedirectToDownloadUrl:true,
            downloadWhenUniversalLinkFailed:true
        }, {
            mlink: "AKXd",
            button: btn_2,
            autoLaunchApp:false,
            autoRedirectToDownloadUrl:true,
            downloadWhenUniversalLinkFailed:true
        }
    ];

    new Mlink(options);
};

window.loadMlink = loadMlink;
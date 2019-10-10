var paused = false;

        var min = 0;
        var seg = 0;

        var mintotal = 0;
        var segtotal = 0;

        var interval;

        var qNum = 1;

        function next(){
            total();
        }

        function total(){
            segtotal += seg;
            mintotal += min;

            mintotal += segtotal/60;
            segtotal = segtotal%60;


        }

        function start(){
            console.log("Starting...");
            interval = setInterval(push, 1000);
        }

        function push(){
            if(seg == 60){
                seg = 0;
                min++;
            }else{
                seg++;
            }
            renderClock();
        }

        function renderClock(){
            let strmin = min;
            let strseg = seg;

            if(strmin < 10){
                strmin = "0"+strmin;
            }
            if(strseg < 10){
                strseg = "0"+strseg;
            }


            $(".clock").html(strmin+":"+strseg);

        }

        



        function pause(){
            if(!paused){
                console.log("Pausing...");
                clearInterval(interval);
                $('#btnPause').html("Retornar");

                paused = true;


            }else{
                console.log("Starting...");
                interval = setInterval(push, 1000);
                $('#btnPause').html("Pausar");
                

                paused = false;
                
            }

            

        }

        $('body').keypress(function(e){
            switch(e.which){
                case 32:next();break;
                case 112:pause();break;
                case 13:start();break;
            }
            console.log(e.which);
        });
        
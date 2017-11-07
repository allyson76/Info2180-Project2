/*When the game the won, the h1 element will change and a pink background will be displayed*/
window.onload = function(){
    var puzzleArea = document.getElementById('puzzlearea');              
    
    piece = puzzleArea.getElementsByTagName('div');                      

    for (var i=0; i<piece.length; i++)                              
    {
        piece[i].style.backgroundImage="url('butterfly1.png')";   
        piece[i].className = 'puzzlepiece';                         
        piece[i].style.left = (i%4*100)+'px';
        piece[i].style.top = (parseInt(i/4)*100) + 'px';
        piece[i].style.backgroundPosition= '-' + piece[i].style.left + ' ' + '-' + piece[i].style.top;
        piece[i].onmouseover = function()
        {
            if (canMove(parseInt(this.innerHTML)))
            {
                this.style.border = "2px solid red";
                this.style.color = "#006600";
            }
        };
        piece[i].onmouseout = function()
        {
            this.style.border = "2px solid black";
            this.style.color = "#000000";
        };

        piece[i].onclick = function()
        {
            if (canMove(parseInt(this.innerHTML)))
            {
                swap(this.innerHTML-1);
                if (checkFinish())
                {
					$("h1").css({"background-color": "pink","font-size": "200%"});
                    $("h1").html("Congrats you win");
                }
                return;
            }
        };
    }

    emptySpaceA = '300px';
    emptySpaceR = '300px';

    var shufflebutton = document.getElementById('shufflebutton');
    shufflebutton.onclick = function()
    {

        for (var i=0; i<250; i++)
        {
            var rand = parseInt(Math.random()* 100) %4;
            if (rand == 0)
            {
                var tmp = calcUp(whiteSpaceX, whiteSpaceY);
                if ( tmp != -1)
                {
                    swap(tmp);
                }
            }
            if (rand == 1)
            {
                var tmp = calcDown(emptySpaceA, emptySpaceR);
                if ( tmp != -1) 
                {
                    swap(tmp);
                }
            }

            if (rand == 2)
            {
                var tmp = calcLeft(emptySpaceA, emptySpaceR);
                if ( tmp != -1)
                {
                    swap(tmp);
                }
            }

            if (rand == 3)
            {
                var tmp = calcRight(emptySpaceA, emptySpaceR);
                if (tmp != -1)
                {
                    swap(tmp);
                }
            }
        }
    };
};

function canMove(position)
{
    if (calcLeft(emptySpaceA, emptySpaceR) == (position-1))
    {
        return true;
    }

    if (calcDown(emptySpaceA, emptySpaceR) == (position-1))
    {
        return true;
    }

    if (calcUp(emptySpaceA, emptySpaceR) == (position-1))
    {
        return true;
    }

    if (calcRight(emptySpaceA, emptySpaceR) == (position-1))
    {
        return true;
    }
}


function checkFinish()
{
    var flag = true;
    for (var i = 0; i < piece.length; i++) {
        var y = parseInt(piece[i].style.top);
        var x = parseInt(piece[i].style.left);

        if (x != (i%4*100) || y != parseInt(i/4)*100)
        {
            flag = false;
            break;
        }
    }
    return flag;
}

function calcLeft(x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);

    if (xx > 0)
    {
        for (var i = 0; i < piece.length; i++) 
        {
            if (parseInt(piece[i].style.left) + 100 == xx && parseInt(piece[i].style.top) == yy)
            {
                return i;
            } 
        }
    }
    else 
    {
        return -1;
    }
}

function calcRight(x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (xx < 300)
    {
        for (var i =0; i<piece.length; i++){
            if (parseInt(piece[i].style.left) - 100 == xx && parseInt(piece[i].style.top) == yy) 
            {
                return i;
            }
        }
    }
    else
    {
        return -1;
    } 
}

function calcUp(x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (yy > 0)
    {
        for (var i=0; i<piece.length; i++)
        {
            if (parseInt(piece[i].style.top) + 100 == yy && parseInt(piece[i].style.left) == xx) 
            {
                return i;
            }
        } 
    }
    else 
    {
        return -1;
    }
}

function calcDown(x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (yy < 300)
    {
        for (var i=0; i<piece.length; i++)
        {
            if (parseInt(piece[i].style.top) - 100 == yy && parseInt(piece[i].style.left) == xx) 
            {
                return i;
            }
        }
    }
    else
    {
        return -1;
    } 
}

function swap(where)
{
    var temp = piece[where].style.top;
    piece[where].style.top = emptySpaceR;
    emptySpaceR = temp;

    temp = piece[where].style.left;
    piece[where].style.left = emptySpaceA;
    emptySpaceA = temp;
}
# CowHeadKing
A Game 

Game Rules
There are 104 cards, numbered 1 to 104.
This game requires at least 2 players. Max players is 10.
Each player will get a hand of cards (10 for example).

Initially, there will be 4 cards on the table, one per row.
Each row can accomodate 5 cards.
Each round the players will have 30 seconds to choose one card that they are going to put to one of the rows on the table. The players will reveal their cards together when time is up. The players will put their cards to one of the rows according to the ascending order of the numbers on their cards. 

Example :

5
6
88
29

Round 1: 
Player 1's card : 7
Player 2's card: 44 
Player 3's card: 104
Player 4's card : 37

Player 1 will put his/her card to one of the rows first, then player 4 -> player 2, and lastly player 3.

So how do you know which row to put your card to?
Rule 1 ) You always put your card to the row where the last card of the row has the smallest POSITIVE number difference with that of your card.

Rule 2 ) If your card is smaller than all of the last cards of every row, the player can pick a row of their choice to clear the row and replace the row with his/her card. * You have to keep the cards being cleared, those cards cannot go back into your hand of cards.

Rule 3) Since each row can only accomodate 5 cards, if your card (according to rule 1) needs to the 6th card of any row, you have to clear that row (replace the whole row with your card). * You have to keep the cards being cleared, those cards cannot go back into your hand of cards.

Each card associates with a number of cow heads, the number of cow heads depends on the number of the card,
multiple of 5, cowHeads = 2,
multiple of 10 , cowHeads = 3 ,
multiple of 11, cowHeads = 5, 
otherwise, cowHead = 1

special case : 55, a multiple of 5 and 11, so cowHeads = 7

HOW TO WIN?
the player with the least number of cow heads at the end of the game wins!

In the above example, player 1's card will be put to row 2, because 7-6 = 1 , which is smaller than that of row 1 (7 - 5 = 2).
Player 1's card cannot be put onto row 3 and 4 in this example because it would create negative difference (7 - 88) < 0 and (7-29) < 0.

After player 1 has placed his/her card: the rows become
5
6, 7
88
29

It is now player 4's turn because player 4 holds the second smallest card.
Player 4's card would need to be put to row 4, and the rows become
5
6, 7
88
29, 37

Then player 2's turn
5
6, 7
88
29, 37, 44

And Then player 3
5
6, 7
88, 104
29, 37, 44

Round 2 : 
Player 1's card : 3
Player 2's card: 45 
Player 3's card: 46
Player 4's card : 47

Player 1's card is smaller than the last cards of every row! When this happens, player 1 will need to pick one of the rows of his/her choice to clear it. Suppose player 1 chooses to clear row 1, "5" would be taken away by player 1 and player 1's card would be p
the round becomes

6, 7
88, 104
29, 37, 44

"use strict";

var render = function ( target, election ) {
	if ( ! target || ! election || ! election.candidates.length ) return new Error ( 'Invalid target element' );
	
	var
		i,
		output = document.createElement ( 'section' ),
		html = '';
	
	html += '<p>' + String ( election.candidates.length || 0 )  + ' candidates running</p>';
	html += '<br>';
	
	for ( i = 0; i < election.candidates.length; i++ ) {
		
		var votes_by_gender = election.candidates[i].getNumOfVotesByGender ();
		var winner = election.calculateWinner ();
		
		html +=  '<article data-candidate-id="' + i + '">' +
						'<h4>' + election.candidates[i].name +'</h4>' +
						'<p><b>Votes:</b> ' + election.candidates[i].votes.length.toLocaleString () + '</p>' +
						'<p><b>Votes by gender:</b><br>&nbsp;&nbsp;&nbsp;&nbsp;<b>Male:</b> ' + votes_by_gender.male.toLocaleString () + '<br>&nbsp;&nbsp;&nbsp;&nbsp;<b>Female:</b> ' + votes_by_gender.female.toLocaleString () + '</p>' +
					'</article>';
	}
	
	html += '<br><p><b>Total votes cast:</b> ' + election.getNumOfVotes ().toLocaleString () + '</p>';
	html += '<p>' + winner.explaination + '</p>';
	
	output.innerHTML = html;
	target.appendChild ( output );
};
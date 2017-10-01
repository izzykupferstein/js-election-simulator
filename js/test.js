// Test

var election;

var builtMockElection = ( function () {
		
		var sayings = [
			'we shall do something different',
			'we need better politicians',
			'I love my country',
			'in god we trust',
			'- give me liberty of give me death',
			'drink up soldiers, we got a war to win',
			'am I dreaming? I think so',
			'I won\'t say nothin\'',
			'ya\'ll have been great'
		];
		
		function generateTestPerson () {
			var gender = Math.floor ( Math.random () * 2 ) === 1 ? 'male' : 'female';
			return {
				name: capitalize ( names[gender][Math.floor(Math.random()*names[gender].length-1)] ) + ' ' + names.last[Math.floor(Math.random()*names.last.length-1)],
				age: Math.floor ( Math.random () * 38 ) + 18,
				gender: gender
			};
		}
		
		function capitalize ( str ) {
			if ( ! str ) return '';
			return str.charAt ( 0 ).toUpperCase () + str.slice ( 1 ).toLowerCase ();
		}
		
		var rand_num_of_candidates = Math.floor ( Math.random () * 4 ) + 2;
		election = Object.create ( Election ).init ();
		
		for ( var i = 0; i < rand_num_of_candidates; i++ ) {
			var candidate = Object.create ( Candidate ).init ( generateTestPerson ().name, sayings[Math.floor(Math.random()*sayings.length)] );
			var r = Math.floor ( Math.random () * 1000000 ) + 100000;
			for ( var j = 0; j < r; j++ ) {
				var voter = generateTestPerson ();
				candidate.castVote ( Object.create ( Voter ).init ( voter.name, voter.age, voter.gender ));
			}
			election.candidates.push ( candidate );
		}
	
	render ( document.getElementById ( 'render' ), election );
	
	console.log ( '------------------------' );
	console.log ( '         REPORT         ' );
	console.log ( '------------------------\n' );
	console.log ( election.candidates.length.toLocaleString () + ' candidates running' );
	var total_sum_of_votes = 0;
	for ( var c = 0; c < election.candidates.length; c++ ) {
		var votes_by_gender = election.candidates[c].getNumOfVotesByGender ();
		console.log ( '\n\tName: ' + election.candidates[c].name );
		console.log ( '\tVotes: ' + election.candidates[c].votes.length.toLocaleString ());
		console.log ( '\tVotes by gender:' );
		console.log ( '\t\tMale: ' + votes_by_gender.male.toLocaleString ());
		console.log ( '\t\tFemale: ' + votes_by_gender.female.toLocaleString ());
		total_sum_of_votes += election.candidates[c].votes.length;
	}
	console.log ( '\n Total votes cast: ' + total_sum_of_votes.toLocaleString () + '\n' );
	console.log ( '------------------------' );

	var winner = election.calculateWinner ();

	console.log ( '[' + winner.explaination + ']' );
	if ( winner.candidate ) winner.candidate.speak ();
	
});
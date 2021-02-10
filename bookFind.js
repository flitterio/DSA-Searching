function find_book(library, dewey, title) {
	//Libraries are generally organized into separate sections for
	//fiction/non-fiction, and often for children's vs adult's. We
	//assume that the 'library' we've been given is the appropriate
	//section. Furthermore, we're going to pretend that this library
	//isn't divided into shelves, despite literally EVERY library I
	//have ever used having more than one shelf - no point making
	//this more complicated than it needs to be. :) And one more
	//short-cut: we assume that Dewey Decimal values can be compared
	//for equality and inequality with each other. The foibles of
	//binary floating-point are outside the scope of this question;
	//you're welcome to use fixed-point or string representations of
	//Dewey call codes. Oh, and we're looking for a book based on
	//title alone, despite the possibility of collisions.
	var start = 0, end = library.length;
	while (start < end) {
		var middle = Math.floor((start + end) / 2);
		if (library[middle].dewey == dewey) {
			//Found the right code. Great! Did we find the book?
			if (library[middle].title == title) return library[middle];
			//Nope. Linearly search around for the book we want.
			for (var idx = middle + 1; library[idx].dewey == dewey; ++idx)
				if (library[idx].title == title) return library[idx];
			for (var idx = middle - 1; library[idx].dewey == dewey; --idx)
				if (library[idx].title == title) return library[idx];
			//Well, we found the right section, but the book isn't
			//here. Guess someone else has borrowed it. Sorry!
			return null;
		}
		if (library[middle].dewey < dewey)
			start = middle + 1;
		else
			end = middle - 1;
	}
	//We don't have anything of that Dewey code, so that book isn't
	//available. Sorry! Try another library.
	return null;
}
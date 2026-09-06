const fs = require('fs');
let code = fs.readFileSync('src/components/ExploreTools.tsx', 'utf8');

const search = `  const filteredCards = useMemo(() => {
    const normalizedPath = currentPath.toLowerCase().trim();

    // Find matching card for current path
    const matchingCard = ALL_CARDS.find(card =>
      card.lowerPaths.some(p => normalizedPath.includes(p))
    );

    // If there is a matching card, filter it out to avoid pointing to the current page.
    const remaining = matchingCard
      ? ALL_CARDS.filter(card => card.id !== matchingCard.id)
      : [...ALL_CARDS];

    // Ensure we always return exactly 4 cards.
    // The list has 6 cards in total. If we filtered out 1, we have 5 remaining.
    // We prioritize keeping the 'booking' card since it is a crucial call to action.
    // So we take the 'booking' card + the first 3 cards of the remaining non-booking cards.
    const bookingCard = remaining.find(card => card.isButton);
    const nonBookingCards = remaining.filter(card => !card.isButton);

    const result = [];
    if (bookingCard) {
      result.push(bookingCard);
    }

    // Add non-booking cards to complete exactly 4 cards
    const limit = bookingCard ? 3 : 4;
    for (let i = 0; i < Math.min(nonBookingCards.length, limit); i++) {
      result.unshift(nonBookingCards[i]); // Put booking card at the end for consistent design layout
    }

    return result;
  }, [currentPath]);`;

const replace = `  const filteredCards = useMemo(() => {
    const normalizedPath = currentPath.toLowerCase().trim();

    let bookingCard = null;
    const nonBookingCards = [];

    // Single pass to partition cards and exclude current page
    for (let i = 0; i < ALL_CARDS.length; i++) {
      const card = ALL_CARDS[i];

      // Skip if this card matches the current path
      let matchesPath = false;
      for (let j = 0; j < card.lowerPaths.length; j++) {
        if (normalizedPath.includes(card.lowerPaths[j])) {
          matchesPath = true;
          break;
        }
      }
      if (matchesPath) continue;

      if (card.isButton) {
        bookingCard = card;
      } else {
        nonBookingCards.push(card);
      }
    }

    const result = [];
    if (bookingCard) {
      result.push(bookingCard);
    }

    const limit = bookingCard ? 3 : 4;
    for (let i = 0; i < Math.min(nonBookingCards.length, limit); i++) {
      result.unshift(nonBookingCards[i]); // Put booking card at the end for consistent layout
    }

    return result;
  }, [currentPath]);`;

code = code.replace(search, replace);
fs.writeFileSync('src/components/ExploreTools.tsx', code);

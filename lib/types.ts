export interface FlashCard {
    front: string;
    back: string;
}

// type SnowmanResult =
//   | {
//       success: true;
//       data: {
//         explanation: string;
//         flashcards: Flashcard[];
//       };
//     }
//   | {
//       success: false;
//       error: string;
//     };

export type SnowmanResult = |{
    success: true;
    data: {
        explanation: string;
        flashcards: FlashCard[];
    };
} | {
    success: false;
    error: string;
}

public class LibraryReports {

    private LibraryService library;

    public LibraryReports(LibraryService library) {
        this.library = library;
    }

    public void showAvailableBooks() {
        System.out.println("\n--- Available Books ---");
        library.getAllBooks().stream()
                .filter(Book::isAvailable)
                .forEach(System.out::println);
    }

    public void showIssuedBooks() {
        System.out.println("\n--- Issued Books ---");
        library.getAllBooks().stream()
                .filter(b -> b.getAvailableCopies() < b.getTotalCopies())
                .forEach(System.out::println);
    }

    public void showStudentsWithBorrowedBooks() {
        System.out.println("\n--- Students Who Borrowed Books ---");
        library.getAllStudents().stream()
                .filter(s -> !s.getBorrowedBooks().isEmpty())
                .forEach(s -> {
                    System.out.println(s.getStudentId() + " | " + s.getName() + 
                                       " | Borrowed: " + s.getBorrowedBooks().size());
                });
    }

    public void showSummary() {
        System.out.println("\n--- Library Summary ---");
        System.out.println("Total Books: " + library.getAllBooks().size());
        System.out.println("Total Students: " + library.getAllStudents().size());
        long totalIssued = library.getAllBooks().stream()
                                  .mapToInt(b -> b.getTotalCopies() - b.getAvailableCopies())
                                  .sum();
        System.out.println("Total Books Issued: " + totalIssued);
    }
}

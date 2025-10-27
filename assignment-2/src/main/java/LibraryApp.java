
import java.util.Scanner;

public class LibraryApp {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        LibraryService library = new LibraryService();
        LibraryReports reports = new LibraryReports(library);

        while (true) {
            System.out.println("\n===== Library Management System =====");
            System.out.println("1. Add Book");
            System.out.println("2. View All Books");
            System.out.println("3. Update Book");
            System.out.println("4. Delete Book");
            System.out.println("5. Add Student");
            System.out.println("6. View Students");
            System.out.println("7. Issue Book");
            System.out.println("8. Return Book");
            System.out.println("9. Reports & Summaries");
            System.out.println("0. Exit");
            System.out.print("Enter your choice: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {
                case 1 -> {
                    System.out.print("Enter Book ID: ");
                    String bid = sc.nextLine();
                    System.out.print("Enter Title: ");
                    String title = sc.nextLine();
                    System.out.print("Enter Author: ");
                    String author = sc.nextLine();
                    System.out.print("Enter Number of Copies: ");
                    int copies = sc.nextInt();
                    sc.nextLine();
                    library.addBook(new Book(bid, title, author, copies));
                }
                case 2 -> library.getAllBooks().forEach(System.out::println);
                case 3 -> {
                    System.out.print("Enter Book ID: ");
                    String bid = sc.nextLine();
                    System.out.print("Enter New Title: ");
                    String title = sc.nextLine();
                    System.out.print("Enter New Author: ");
                    String author = sc.nextLine();
                    System.out.print("Enter New Number of Copies: ");
                    int copies = sc.nextInt();
                    sc.nextLine();
                    library.updateBook(bid, title, author, copies);
                }
                case 4 -> {
                    System.out.print("Enter Book ID: ");
                    String bid = sc.nextLine();
                    library.deleteBook(bid);
                }
                case 5 -> {
                    System.out.print("Enter Student ID: ");
                    String sid = sc.nextLine();
                    System.out.print("Enter Name: ");
                    String name = sc.nextLine();
                    library.addStudent(new Student(sid, name));
                }
                case 6 -> library.getAllStudents().forEach(System.out::println);
                case 7 -> {
                    System.out.print("Enter Student ID: ");
                    String sid = sc.nextLine();
                    System.out.print("Enter Book ID: ");
                    String bid = sc.nextLine();
                    library.issueBook(sid, bid);
                }
                case 8 -> {
                    System.out.print("Enter Student ID: ");
                    String sid = sc.nextLine();
                    System.out.print("Enter Book ID: ");
                    String bid = sc.nextLine();
                    library.returnBook(sid, bid);
                }
                case 9 -> {
                    System.out.println("\n--- Reports Menu ---");
                    System.out.println("1. Available Books");
                    System.out.println("2. Issued Books");
                    System.out.println("3. Students with Borrowed Books");
                    System.out.println("4. Library Summary");
                    System.out.print("Choose option: ");
                    int r = sc.nextInt();
                    switch (r) {
                        case 1 -> reports.showAvailableBooks();
                        case 2 -> reports.showIssuedBooks();
                        case 3 -> reports.showStudentsWithBorrowedBooks();
                        case 4 -> reports.showSummary();
                        default -> System.out.println("Invalid option!");
                    }
                }
                case 0 -> {
                    System.out.println("Exiting system...");
                    sc.close();
                    return;
                }
                default -> System.out.println("Invalid choice!");
            }
        }
    }
}

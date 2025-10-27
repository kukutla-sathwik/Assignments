public class Book {
    private String bookId;
    private String title;
    private String author;
    private int totalCopies;
    private int availableCopies;

    public Book(String bookId, String title, String author, int totalCopies) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.totalCopies = totalCopies;
        this.availableCopies = totalCopies;
    }

    public String getBookId() { return bookId; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public int getTotalCopies() { return totalCopies; }
    public int getAvailableCopies() { return availableCopies; }

    public boolean isAvailable() { return availableCopies > 0; }

    public void issueCopy() {
        if (availableCopies > 0) availableCopies--;
    }

    public void returnCopy() {
        if (availableCopies < totalCopies) availableCopies++;
    }

    @Override
    public String toString() {
        return bookId + " | " + title + " | " + author + 
               " | Copies: " + availableCopies + "/" + totalCopies;
    }
}
